import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

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

  @Mutation
  add(item: Competitor) {
    const ref = firebase.database().ref('competitors').push()
    item.id = ref.key!!
    ref.set(item)
  }

  @Mutation
  remove(_: Competitor) {
    throw new Error('not implemented')
  }

  @Mutation
  addWeight({ id, weight }: { id: string; weight: number }) {
    firebase
      .database()
      .ref(`competitors/${id}`)
      .update({ weightMeasured: weight })
  }

  @Mutation
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
