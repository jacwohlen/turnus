import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'

import { RunningMatch, MatchState, Fighter, MatchScore } from '~/types/models'

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
  match: RunningMatch | null = null

  @Mutation
  setMatchId(matchId: string) {
    this.matchId = matchId
  }

  get getTimerMs(): number {
    if (this.match) return this.match.timerMs!
    else return 0
  }

  get getScoreRed() {
    console.log('matchRunner::getScoreRed')
    // FIXME: Since getScoreRed is called before initialization is done (Score.vue::created)
    // We need to check for null here
    // https://stackoverflow.com/questions/53006986/vuejs-computed-property-is-calculated-before-created-in-component
    if (this.match) return this.match.fighter1Score
    else return { ippon: 0, wazari: 0, shido: 0 }
  }

  get getScoreWhite() {
    if (this.match) return this.match.fighter2Score
    else return { ippon: 0, wazari: 0, shido: 0 }
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
  async setScore({
    matchId,
    fighter,
    score,
  }: {
    matchId: string
    fighter: Fighter
    score: MatchScore
  }) {
    if (Fighter.Red === fighter) {
      await firebase
        .database()
        .ref(`matchesScheduled/${matchId}`)
        .update({ fighter1Score: score })
    } else {
      await firebase
        .database()
        .ref(`matchesScheduled/${matchId}`)
        .update({ fighter2Score: score })
    }
  }

  @Action({ rawError: true })
  async init(matchId: string) {
    this.setMatchId(matchId)

    // Create initial state if not available
    const ret = await firebase
      .database()
      .ref(`matchesScheduled/${matchId}`)
      .get()
    const match = ret.val()
    if (match.state === undefined) {
      await firebase
        .database()
        .ref(`matchesScheduled/${matchId}/state`)
        .update(this.matchState)
    }
    // --

    // Create initial socres if not available
    if (
      match.fighter1Score === undefined ||
      match.fighter2Score === undefined
    ) {
      const updates: { [index: string]: any } = {}
      const score = {
        ippon: 0,
        wazari: 0,
        shido: 0,
        hansoku: false,
      }
      updates[`matchesScheduled/${matchId}/fighter1Score`] = score
      updates[`matchesScheduled/${matchId}/fighter2Score`] = score
      await firebase.database().ref().update(updates)
    }
    // --

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
