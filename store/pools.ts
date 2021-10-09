import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/auth'

import { schedulerStore } from '~/store'

import { Competitor, Pool, PoolSystem, PoolState, Match } from '~/types/models'

@Module({
  name: 'pools',
  stateFactory: true,
  namespaced: true,
})
export default class Pools extends VuexModule {
  list: Pool[] = []

  get pools() {
    return this.list.filter((pool: Pool) => pool.status === PoolState.NOT_READY)
  }

  get poolsReady() {
    return this.list.filter((pool: Pool) => pool.status === PoolState.READY)
  }

  get getPoolById() {
    return (poolId: string): Pool | null => {
      const found = this.list.filter((p) => p.id === poolId)
      return found.length === 1 ? found[0] : null
    }
  }

  get getPotentialPools() {
    const t = this
    return function (competitor: Competitor) {
      // FIXME: Maybe rewrite to use firebase directly
      return t.list.filter(function (e) {
        // console.log(`check ${e.generated} === true`)
        // console.log(`check ${e.criteria.ageFrom} > ${competitor.birthyear}`)
        // console.log(`check ${e.criteria.ageTo} <= ${competitor.birthyear}`)
        // console.log(`check ${e.criteria.sex} === ${competitor.sex}`)
        // console.log(`check ${e.criteria.weightFrom} < ${competitor.weightMeasured}`)
        // console.log(`check ${e.criteria.weightTo} >= ${competitor.weightMeasured}`)
        return (
          e.generated === true && // only generated pools have criterias
          e.criteria!! &&
          e.criteria.ageFrom > competitor.birthyear &&
          e.criteria.ageTo <= competitor.birthyear &&
          e.criteria.sex === competitor.sex &&
          e.criteria.weightFrom < competitor.weightMeasured!! &&
          e.criteria.weightTo >= competitor.weightMeasured!!
        )
      })
    }
  }

  @Action({ rawError: true })
  async ready(pool: Pool) {
    if (!pool.competitors)
      throw new Error(
        `The pool "${pool.name}" has no competitors assigned and therefore cannot be moved to schedule`
      )

    if (pool.system === PoolSystem.ROUND_ROBIN) {
      const matches = BracketGenerator.roundrobin(
        Object.keys(pool.competitors),
        pool.id
      )
      await firebase
        .database()
        .ref(`pools/${pool.id}`)
        .update({ status: 'ready' })
      await schedulerStore.addMatches(matches)
    } else {
      alert('Not Implemented')
    }
  }

  @Action({ rawError: true })
  async notReady(pool: Pool) {
    await firebase
      .database()
      .ref(`matches`)
      .orderByChild(`poolId`)
      .equalTo(pool.id)
      .get()
      .then(async (snapshot) => {
        const val = snapshot.val()
        if (val) {
          for (const matchId of Object.keys(val)) {
            await firebase.database().ref(`matches/${matchId}`).remove()
          }
        }
      })
    await firebase
      .database()
      .ref(`pools/${pool.id}`)
      .update({ status: 'not ready' })
  }

  @Mutation
  // FIXME: any
  schedule({ id, tatamiId }: any) {
    firebase.database().ref(`pools/${id}`).update({ tatamiScheduled: tatamiId })
  }

  @Mutation
  unschedule(id: string) {
    firebase.database().ref(`pools/${id}`).update({ tatamiScheduled: null })
  }

  @Action
  async add(pool: Partial<Pool>) {
    const ref = firebase.database().ref('pools').push()
    pool.id = ref.key!!
    await ref.set({
      id: pool.id,
      name: pool.name,
      system: 'Round Robin',
      status: 'not ready',
      tatamiScheduled: null,
      competitors: [],
      generated: pool.generated,
      generationSource: pool.generationSource,
      criteria: pool.criteria,
    })
  }

  @Action
  async edit({ id, name, system }: Partial<Pool>) {
    await firebase.database().ref(`pools/${id}`).update({
      name,
      system,
    })
  }

  @Action
  async remove({ id }: { id: string }) {
    await firebase.database().ref(`pools/${id}`).remove()
  }

  @Action
  async addCompetitorToPool({
    competitor,
    pool,
  }: {
    competitor: Competitor
    pool: Pool
  }) {
    await firebase
      .database()
      .ref(`pools/${pool.id}/competitors/${competitor.id}`)
      .set({
        id: competitor.id,
        firstname: competitor.firstname,
        lastname: competitor.lastname,
        club: competitor.club,
      })
  }

  @Action
  async removeCompetitorFromAllPools(competitorId: string) {
    await firebase.database().ref(`/competitors/${competitorId}/pools`).remove()
    this.list.forEach(async (pool) => {
      await firebase
        .database()
        .ref(`pools/${pool.id}/competitors/${competitorId}`)
        .remove()
    })
  }

  @Action
  async removeCompetitorFromPool({
    competitor,
    pool,
  }: {
    competitor: Competitor
    pool: Pool
  }) {
    await firebase
      .database()
      .ref(`pools/${pool.id}/competitors/${competitor.id}`)
      .remove()
    await firebase
      .database()
      .ref(`/competitors/${competitor.id}/pools`)
      .remove()
  }

  @Action
  async removeAllPoolsGeneratedByCategory({
    categoryId,
  }: {
    categoryId: string
  }) {
    let i = this.list.length
    while (i--) {
      const pool = this.list[i]
      if (
        pool.generated === true &&
        pool.generationSource!!.id === categoryId
      ) {
        await firebase.database().ref(`pools/${pool.id}`).remove()
      }
    }
  }

  @Action
  async setCompetitorInPools({
    competitor,
    pools,
  }: {
    competitor: Competitor
    pools: Pool[]
  }) {
    const db = firebase.database()
    await this.removeCompetitorFromAllPools(competitor.id)

    let c = 0
    pools.forEach(async (item: Pool) => {
      await this.addCompetitorToPool({ competitor, pool: item })
      // also create competitor/pools reference
      await db.ref(`competitors/${competitor.id}/pools/${c}`).set({
        id: item.id,
        name: item.name,
      })
      c = c + 1
    })
  }

  @Action async setPoolSystem({
    id,
    system,
  }: {
    id: string
    system: PoolSystem
  }) {
    await firebase.database().ref(`pools/${id}`).update({ system })
  }

  @Action
  init() {
    const action = firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef('list', firebase.database().ref('pools'))
    }) as Function
    return action(this.context)
  }
}

export class BracketGenerator {
  static roundrobin(competitors: string[], poolId: string): Match[] {
    const ret: Match[] = []

    let i: number = 0
    while (i < competitors.length) {
      let d = i
      while (d < competitors.length - 1) {
        ret.push({
          id: '',
          n: ret.length,
          fighter1Id: competitors[i],
          fighter2Id: competitors[d + 1],
          poolId,
        })
        d = d + 1
      }
      i = i + 1
    }

    return ret
  }
}
