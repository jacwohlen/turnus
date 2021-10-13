import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'

import { Match, MatchState } from '~/types/models'

@Module({
  name: 'matchRunner',
  stateFactory: true,
  namespaced: true,
})
export default class MatchRunner extends VuexModule {
  matchId: string = ''
  matchState: MatchState = {
    timeBeganMs: 0,
    timeStoppedMs: 0,
    stoppedDurationMs: 0,
    started: false,
    timeElapsedMs: 0,
  }
  match: Match = {
    id: '',
    n: 0,
    fighter1Id: '',
    fighter2Id: '',
    poolId: '',
  }

  @Mutation
  setMatchId(matchId: string) {
    this.matchId = matchId
  }

  get getTimerMs(): number {
    if (this.match) return this.match.timerMs!
    else return 0
  }

  @Action({ rawError: true })
  async updateMatchState(matchState: MatchState) {
    await firebase
      .database()
      .ref(`matchesScheduled/${this.matchId}/state`)
      .update(matchState)
  }

  @Action({ rawError: true })
  async setTimer(timerMs: number) {
    await firebase
      .database()
      .ref(`matchesScheduled/${this.matchId}`)
      .update({ timerMs })
  }

  @Action({ rawError: true })
  async init(matchId: string) {
    this.setMatchId(matchId)

    const ret = await firebase
      .database()
      .ref(`matchesScheduled/${matchId}/state`)
      .get()
    if (ret.val() === null) {
      firebase
        .database()
        .ref(`matchesScheduled/${matchId}/state`)
        .update(this.matchState)
    }

    const action = firebaseAction(({ bindFirebaseRef }) => {
      return Promise.all([
        bindFirebaseRef(
          'matchState',
          firebase.database().ref(`matchesScheduled/${matchId}/state`)
        ),
        bindFirebaseRef(
          'match',
          firebase.database().ref(`matchesScheduled/${matchId}`)
        ),
      ])
    }) as Function
    return action(this.context)
  }
}
