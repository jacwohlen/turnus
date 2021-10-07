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
  async addMatches(matches: Match[]) {
    await firebase.database().ref(`matches`).set(matches)
  }

  @Action
  async next() {
    if (this.matches.length < 2) return
    const match: Match = this.matches[0]
    await firebase.database().ref(`matches/${match.n}`).remove()
    await firebase.database().ref(`matchesDone/${match.n}`).set(match)
  }

  @Action({ rawError: true })
  async previous() {
    if (this.matchesDone.length < 1) return
    const match: Match = this.matchesDone[this.matchesDone.length - 1]
    await firebase.database().ref(`matchesDone/${match.n}`).remove()
    await firebase.database().ref(`matches/${match.n}`).set(match)
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
