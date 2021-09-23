import { Module, VuexModule, Action } from 'vuex-module-decorators'

import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/database'

import { Competitor } from '~/types/models'

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
    },
  ]

  @Action
  add(item: Competitor) {
    const ref = firebase.database().ref('competitors').push()
    item.id = ref.key!!
    ref.set(item)
  }

  @Action
  remove(_: Competitor) {
    throw new Error('not implemented')
  }

  @Action
  addWeight({ id, weight }: { id: string; weight: number }) {
    firebase
      .database()
      .ref(`competitors/${id}`)
      .update({ weightMeasured: weight })
  }

  @Action
  removeWeight(id: string) {
    firebase
      .database()
      .ref(`competitors/${id}`)
      .update({ weightMeasured: null })
  }

  @Action
  init() {
    const action = firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef('list', firebase.database().ref('competitors'))
    }) as Function
    return action(this.context)
  }
}
