import { Module, VuexModule, Action } from 'vuex-module-decorators'

import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'

import { Match, SchedulerStats } from '~/types/models'

@Module({
  name: 'scheduler',
  stateFactory: true,
  namespaced: true,
})
export default class Scheduler extends VuexModule {
  matches: Match[] = []
  matchesDone: Match[] = []

  get getStats(): SchedulerStats {
    return {
      upcoming: this.matches.length,
      done: this.matchesDone.length,
    }
  }

  get getCurrentMatch(): Match | null {
    if (this.matches.length) {
      return this.matches[0]
    } else {
      return null
    }
  }

  get getNextMatch(): Match | null {
    if (this.matches.length > 1) {
      return this.matches[1]
    } else {
      return null
    }
  }

  @Action
  addMatches(matches: Match[]) {
    firebase.database().ref(`matches`).set(matches)
  }

  @Action
  next() {
    if (this.matches.length < 2) return
    const match: Match = this.matches[0]
    firebase.database().ref(`matches/${match.n}`).remove()
    firebase.database().ref(`matchesDone/${match.n}`).set(match)
  }

  @Action({ rawError: true })
  previous() {
    if (this.matchesDone.length < 1) return
    const match: Match = this.matchesDone[this.matchesDone.length - 1]
    firebase.database().ref(`matchesDone/${match.n}`).remove()
    firebase.database().ref(`matches/${match.n}`).set(match)
  }

  @Action({ rawError: true })
  init() {
    const action = firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef('matches', firebase.database().ref('matches'))
    }) as Function
    return action(this.context)
  }

  @Action
  init2() {
    const action = firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef(
        'matchesDone',
        firebase.database().ref('matchesDone')
      )
    }) as Function
    return action(this.context)
  }
}

export class BracketGenerator {
  static roundrobin(fighters: string[]): Match[] {
    const ret: Match[] = []

    let i: number = 0
    while (i < fighters.length) {
      let d = i
      while (d < fighters.length - 1) {
        ret.push({
          n: ret.length,
          fighter1: fighters[i],
          fighter2: fighters[d + 1],
        })
        d = d + 1
      }
      i = i + 1
    }

    return ret
  }
}
