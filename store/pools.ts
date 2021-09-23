import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/auth'

import { Competitor, Pool } from '~/types/models'

@Module({
  name: 'pools',
  stateFactory: true,
  namespaced: true,
})
export default class Pools extends VuexModule {
  list: Pool[] = []

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


  @Mutation
  ready(id: string) {
    firebase.database().ref(`pools/${id}`).update({ status: 'ready' })
  }

  @Mutation
  notReady(id: string) {
    firebase.database().ref(`pools/${id}`).update({ status: 'not ready' })
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
  add({ name, generated, generationSource, criteria }: Pool) {
    const ref = firebase.database().ref('pools').push()
    const id = ref.key
    ref.set({
      id,
      name,
      system: 'Round Robin',
      status: 'not ready',
      tatamiScheduled: null,
      competitors: [],
      generated,
      generationSource,
      criteria,
    })
  }

  @Action
  addCompetitorToPool({
    competitor,
    pool,
  }: {
    competitor: Competitor
    pool: Pool
  }) {
    console.log(` Received: ${competitor} and ${pool}`)
    firebase
      .database()
      .ref(`pools/${pool.id}/competitors/${competitor.id}`)
      .set(competitor)
  }

  @Action
  removeCompetitorFromAllPools(competitor: Competitor) {
    this.list.forEach((pool) => {
      firebase
        .database()
        .ref(`pools/${pool.id}/competitors/${competitor.id}`)
        .remove()
    })
  }

  @Action
  removeCompetitorFromPool({
    competitor,
    pool,
  }: {
    competitor: Competitor
    pool: Pool
  }) {
    firebase
      .database()
      .ref(`pools/${pool.id}/competitors/${competitor.id}`)
      .remove()
    firebase.database().ref(`/competitors/${competitor.id}/pools`).remove()
  }

  @Action
  // FIXME: Rename to removeAllPoolsGeneratedByCategory
  removeAllPoolsFromCategory({ categoryId }: { categoryId: string }) {
    let i = this.list.length
    while (i--) {
      const pool = this.list[i]
      if (
        pool.generated === true &&
        pool.generationSource!!.id === categoryId
      ) {
        firebase.database().ref(`pools/${pool.id}`).remove()
      }
    }
  }

  @Action
  setCompetitorInPools({
    competitor,
    pools,
  }: {
    competitor: Competitor
    pools: Pool[]
  }) {
    const db = firebase.database()
    this.removeCompetitorFromAllPools(competitor)
    firebase.database().ref(`/competitors/${competitor.id}/pools`).remove()

    let c = 0
    pools.forEach((item: Pool) => {
      this.addCompetitorToPool({ competitor, pool: item })
      // also create competitor/pools reference
      db.ref(`competitors/${competitor.id}/pools/${c}`).set({
        id: item.id,
        name: item.name,
      })
      c = c + 1
    })
  }

  @Action
  init() {
    const action = firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef('list', firebase.database().ref('pools'))
    }) as Function
    return action(this.context)
  }
}
