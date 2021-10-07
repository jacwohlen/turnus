import { Module, VuexModule, Action } from 'vuex-module-decorators'

import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/database'

import { Competitor, CompetitorStatus, Pool } from '~/types/models'

@Module({
  name: 'competitors',
  stateFactory: true,
  namespaced: true,
})
export default class Competitors extends VuexModule {
  list: Competitor[] = [
    {
      id: '',
      firstname: '',
      lastname: '',
      sex: '',
      birthyear: 0,
      club: '',
      weight: 0,
      weightMeasured: null,
      pools: [],
      status: CompetitorStatus.Registered,
    },
  ]

  @Action
  async add(item: Competitor) {
    const ref = firebase.database().ref('competitors').push()
    item.id = ref.key!!
    await ref.set(item)
  }

  @Action
  remove(_: Competitor) {
    throw new Error('not implemented')
  }

  @Action
  checkin({
    competitor,
    weight,
    pools,
  }: {
    competitor: Competitor
    weight: number
    pools: Pool[]
  }) {
    firebase.database().ref(`competitors/${competitor.id}`).update({
      weightMeasured: weight,
      // pools,
      status: CompetitorStatus.CheckedIn,
    })
    this.context.dispatch(
      'pools/setCompetitorInPools',
      {
        competitor,
        pools,
      },
      {
        root: true,
      }
    )
  }

  @Action
  checkout({ id }: { id: string }) {
    firebase.database().ref(`competitors/${id}`).update({
      weightMeasured: null,
      status: CompetitorStatus.Registered,
    })
    this.context.dispatch('pools/removeCompetitorFromAllPools', id, {
      root: true,
    })
  }

  @Action
  init() {
    const action = firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef('list', firebase.database().ref('competitors'))
    }) as Function
    return action(this.context)
  }
}
