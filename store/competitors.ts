import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'
import 'firebase/database'

interface Competitor {
  id: number
  firstname: string
  lastname: string
  sex: string
  birthyear: number
  club: string
  weight: number
  weightMeasured: number | null
}

@Module({
  name: 'competitors',
  stateFactory: true,
  namespaced: true,
})
export default class Competitors extends VuexModule {
  list: Competitor[] = [
    {
      id: 0,
      firstname: 'Andreas',
      lastname: 'Schmid',
      sex: 'male',
      birthyear: 1990,
      club: 'JAC Wohlen',
      weight: 92,
      weightMeasured: 92.3,
    },
    {
      id: 1,
      firstname: 'Benjamin',
      lastname: 'Wey',
      sex: 'male',
      birthyear: 1988,
      club: 'JAC Wohlen',
      weight: 73,
      weightMeasured: null,
    },
    {
      id: 2,
      firstname: 'Samuel',
      lastname: 'Wey',
      sex: 'male',
      birthyear: 1992,
      club: 'JAC Wohlen',
      weight: 66,
      weightMeasured: null,
    },
    {
      id: 3,
      firstname: 'Manuela',
      lastname: 'Scherer',
      sex: 'female',
      birthyear: 1990,
      club: 'JAC Wohlen',
      weight: 60,
      weightMeasured: null,
    },
  ]

  @Mutation
  add(item: Competitor) {
    firebase.database().ref('competitors').push(item)
  }

  @Mutation
  remove(_: Competitor) {
    throw new Error('not implemented')
    // firebase.database().ref(`competitors/${item.id}`).push(null)
  }

  @Mutation
  addWeight({ id, weight }: { id: string; weight: number }) {
    firebase
      .database()
      .ref(`competitors/${id}`)
      .update({ weightMeasured: weight })
  }

  @Mutation
  removeWeight(id: number) {
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
