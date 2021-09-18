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
  add(competitor: Competitor) {
    firebase.database().ref('competitors').push(competitor)
  }

  @Mutation
  remove({ c }: { c: Competitor }) {
    this.list.splice(this.list.indexOf(c), 1)
  }

  @Mutation
  addWeight({ id, weight }: { id: number; weight: number }) {
    const idx = this.list.findIndex((x: Competitor) => x.id === id)
    Object.assign(this.list[idx], { id, weightMeasured: weight })
  }

  @Mutation
  removeWeight(id: number) {
    const idx = this.list.findIndex((x: Competitor) => x.id === id)
    Object.assign(this.list[idx], { id, weightMeasured: null })
  }

  @Action
  init() {
    const action = firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef('list', firebase.database().ref('competitors'))
    }) as Function
    // Call function that firebaseAction returns
    return action(this.context)
  }
}
