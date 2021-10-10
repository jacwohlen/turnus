import { Module, VuexModule, Action } from 'vuex-module-decorators'

import { firebaseAction } from 'vuexfire'
import firebase from 'firebase/app'

import { Match, SchedulerStats, Tatami, MatchStatus } from '~/types/models'

@Module({
  name: 'scheduler',
  stateFactory: true,
  namespaced: true,
})
export default class Scheduler extends VuexModule {
  matches: Match[] = []
  matchesScheduled: Match[] = []
  matchesDone: Match[] = []
  tatamis: Tatami[] = []

  get getStats(): (tatamiId: string) => SchedulerStats {
    return (tatamiId: string) => {
      const upcoming = this.getMachtesScheduledOnTatami(tatamiId).length
      const done = this.getMachtesDoneOnTatami(tatamiId).length
      return {
        upcoming,
        done,
        total: upcoming + done,
      }
    }
  }

  get getCurrentMatch(): (tatamiId: string) => Match | null {
    return (tatamiId: string): Match | null => {
      const found = this.matchesScheduled.filter(
        (match) => match.tatamiScheduled === tatamiId
      )
      if (found.length > 0) {
        return found[0]
      } else {
        return null
      }
    }
  }

  get getNextMatch(): (tatamiId: string) => Match | null {
    return (tatamiId: string): Match | null => {
      const found = this.matchesScheduled.filter(
        (match) => match.tatamiScheduled === tatamiId
      )
      if (found.length > 1) {
        return found[1]
      } else {
        return null
      }
    }
  }

  get getTatamis(): Tatami[] {
    return this.tatamis
  }

  get getTatamiById() {
    return (tatamiId: string): Tatami | null => {
      const found = this.tatamis.filter((t) => t.id === tatamiId)
      return found.length === 1 ? found[0] : null
    }
  }

  get getMachtesScheduledOnTatami() {
    return (tatamiId: string): Match[] => {
      return this.matchesScheduled.filter(
        (match: Match) => match.tatamiScheduled === tatamiId
      )
    }
  }

  get getMachtesDoneOnTatami() {
    return (tatamiId: string): Match[] => {
      return this.matchesDone.filter(
        (match: Match) => match.tatamiScheduled === tatamiId
      )
    }
  }

  get getActualMatch() {
    return (tatamiId: string): Match | null => {
      const found = this.matchesScheduled.filter(
        (match: Match) =>
          // match.status === MatchStatus.RUNNING &&
          // FIXME: SORT by n...
          match.tatamiScheduled === tatamiId
      )
      return found.length >= 1 ? found[0] : null
    }
  }

  @Action
  async addMatches(matches: Match[]) {
    for (const match of matches) {
      match.id = `${match.poolId}_${match.n}`
      await firebase.database().ref(`matches/${match.id}`).set(match)
    }
  }

  @Action
  async next(tatamiId: string) {
    const matches = this.getMachtesScheduledOnTatami(tatamiId)
    if (matches.length < 2) return
    const match: Match = matches[0]
    await firebase.database().ref(`matchesScheduled/${match.id}`).remove()
    await firebase.database().ref(`matchesDone/${match.id}`).set(match)
  }

  @Action({ rawError: true })
  async previous(tatamiId: string) {
    const matches = this.getMachtesDoneOnTatami(tatamiId)
    if (matches.length < 1) return
    const match: Match = matches[matches.length - 1]
    await firebase.database().ref(`matchesDone/${match.id}`).remove()
    await firebase.database().ref(`matchesScheduled/${match.id}`).set(match)
  }

  @Action
  async addTatami(tatami: Tatami) {
    const ref = firebase.database().ref('tatamis').push()
    tatami.id = ref.key!!
    await ref.set(tatami)
  }

  @Action
  async updateTatami(tatami: Tatami) {
    await firebase.database().ref(`tatamis/${tatami.id}`).update(tatami)
  }

  @Action
  async removeTatami(tatamiId: string) {
    await firebase.database().ref(`tatamis/${tatamiId}`).remove()
  }

  @Action({ rawError: true })
  scheduleMatches({
    matches,
    tatamiId,
  }: {
    matches: Match[]
    tatamiId: string
  }) {
    matches.forEach((match: Match) => {
      const updates: { [index: string]: any } = {}
      updates[`matches/${match.id}`] = null
      updates[`matchesScheduled/${match.id}`] = {
        ...match,
        tatamiScheduled: tatamiId,
      }
      return firebase.database().ref().update(updates)
    })
  }

  @Action({ rawError: true })
  unscheduleMatches({ matches }: { matches: Match[] }) {
    matches.forEach(async (match: Match) => {
      const updates: { [index: string]: any } = {}
      updates[`matchesScheduled/${match.id}`] = null
      updates[`matches/${match.id}`] = {
        ...match,
        tatamiScheduled: null,
      }
      await firebase.database().ref().update(updates)
    })
  }

  @Action({ rawError: true })
  init() {
    const action = firebaseAction(({ bindFirebaseRef }) => {
      return Promise.all([
        bindFirebaseRef('matches', firebase.database().ref('matches')),
        bindFirebaseRef(
          'matchesScheduled',
          firebase.database().ref('matchesScheduled')
        ),
        bindFirebaseRef('matchesDone', firebase.database().ref('matchesDone')),
        bindFirebaseRef('tatamis', firebase.database().ref('tatamis')),
      ])
    }) as Function
    return action(this.context)
  }
}
