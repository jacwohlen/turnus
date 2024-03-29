<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <v-toolbar>
          <v-toolbar-title>Operator</v-toolbar-title>
          <v-btn icon>
            <v-icon>mdi-coffee</v-icon>
          </v-btn>
          <v-btn icon @click="previous()">
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
          <v-col cols="1">
            <v-progress-linear height="25">
              <strong>{{ stats.done }}/{{ stats.total }}</strong>
            </v-progress-linear>
          </v-col>
          <v-btn icon @click="next()">
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
          <v-spacer />
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </v-col>
      <v-col v-if="!actualMatch" cols="12">
        <span>Kein Kampf im moment... :)</span>
      </v-col>
      <template v-else>
        <v-col cols="12">
          <v-row no-gutters class="border">
            <v-col class="tatami" md="2">{{ tatami.name }}</v-col>
            <v-col class="pool" md="8" align="center">{{ pool.name }}</v-col>
            <v-col md="2"></v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row no-gutters>
            <v-col class="red2" md="6">
              <v-row no-gutters>
                <v-col cols="12" class="competitor">
                  {{ actualCompetitorRed | name }}
                </v-col>
                <v-col cols="12" class="club">{{
                  actualCompetitorRed | club
                }}</v-col>
              </v-row>
            </v-col>
            <v-col class="white" md="6">
              <v-row no-gutters>
                <v-col cols="12" class="competitor">
                  {{ actualCompetitorWhite | name }}
                </v-col>
                <v-col cols="12" class="club">{{
                  actualCompetitorWhite | club
                }}</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row no-gutters class="border">
            <v-col class="red2" md="6">
              <ScoreboardScore
                :matchId="actualMatch.id"
                :fighter="Fighter.Red"
              />
            </v-col>
            <v-col class="white" md="6">
              <ScoreboardScore
                :matchId="actualMatch.id"
                :fighter="Fighter.White"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row no-gutters class="border">
            <v-col class="flag" md="3">Flag</v-col>
            <v-col md="6" align="center">
              <Clock :matchId="actualMatch.id" :useTimer="true" />
            </v-col>
            <v-col class="flag" md="3">Flag</v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-row no-gutters class="border">
            <v-col class="next" md="1">Next</v-col>
            <v-col class="red2" md="5">
              <v-row no-gutters>
                <v-col cols="12" class="nextCompetitor">{{
                  nextCompetitorRed | name
                }}</v-col>
                <v-col cols="12" class="nextCompetitorClub">{{
                  nextCompetitorRed | club
                }}</v-col>
              </v-row>
            </v-col>
            <v-col class="white" md="5">
              <v-row no-gutters>
                <v-col cols="12" class="nextCompetitor">{{
                  nextCompetitorWhite | name
                }}</v-col>
                <v-col cols="12" class="nextCompetitorClub">{{
                  nextCompetitorWhite | club
                }}</v-col>
              </v-row>
            </v-col>
            <v-col md="1"></v-col>
          </v-row>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import {
  schedulerStore,
  matchRunnerStore,
  alertStore,
  competitorsStore,
  poolsStore,
} from '~/store'
import { Tatami, Competitor, Fighter } from '~/types/models'

Vue.filter('name', function (c: Competitor) {
  return c !== null ? c.lastname.toUpperCase() + ' ' + c.firstname : ''
})

Vue.filter('club', function (c: Competitor) {
  return c !== null ? c.club : ''
})

@Component({
  layout: 'ScreenLayout',
  async asyncData({ params }) {
    return { tatamiId: params.tatamiId }
  },
})
export default class extends Vue {
  async created() {
    await schedulerStore.init()
    await competitorsStore.init()
    await poolsStore.init()

    if (!this.tatamiId) {
      alertStore.setError({ msg: 'Missing tatamiId' })
      return
    }
    const tatami = schedulerStore.getTatamiById(this.tatamiId)
    if (!tatami) {
      alertStore.setError({
        msg: `Tatami with Id '${this.tatamiId}' not found.`,
      })
      return
    }
    this.tatami = tatami
  }
  tatamiId: string = '' // set in asyncData
  tatami: Tatami = { id: '', name: '' } // set in created()
  Fighter: any = Fighter

  get stats() {
    return schedulerStore.getStats(this.tatami.id)
  }

  get pool() {
    return poolsStore.getPoolById(this.actualMatch!.poolId)
  }

  get actualCompetitorRed() {
    if (!this.actualMatch) return null
    return competitorsStore.getCompetitorById(this.actualMatch!.fighter1Id)
  }

  get actualCompetitorWhite() {
    if (!this.actualMatch) return null
    return competitorsStore.getCompetitorById(this.actualMatch!.fighter2Id)
  }

  get actualMatch() {
    return schedulerStore.getActualMatch(this.tatami.id)
  }

  get nextCompetitorRed() {
    if (!this.nextMatch) return null
    return competitorsStore.getCompetitorById(this.nextMatch.fighter1Id)
  }

  get nextCompetitorWhite() {
    if (!this.nextMatch) return null
    return competitorsStore.getCompetitorById(this.nextMatch!.fighter2Id)
  }

  get nextMatch() {
    return schedulerStore.getNextMatch(this.tatami.id)
  }

  next() {
    // FIXME: Only move next after scoring..
    schedulerStore.next(this.tatami.id)
  }
  previous() {
    schedulerStore.previous(this.tatami.id)
  }
}
</script>
<style>
.container {
  line-height: 1.07;

  /* without operator bar */

  /* line-height: 1.177; */

  overflow: hidden;
}
.border {
  background-color: lightgray;
}
.tatami {
  font-size: 6vh;
  font-weight: bold;
}
.pool {
  font-size: 6vh;
}
.competitor {
  font-size: 10vh;
  font-weight: bold;
}
.club {
  font-size: 7vh;
}
.score {
  font-size: 19vh;
  font-weight: bold;
}
.scorelegend {
  font-size: 6vh;
  font-weight: bold;
}
.flag {
  font-size: 4vh;
}
.next {
  font-size: 6vh;
}
.nextCompetitor {
  font-size: 7vh;
  font-weight: bold;
}
.nextCompetitorClub {
  font-size: 6vh;
  font-weight: bold;
}

/* red is a class known by vuetify -> red2 */
.red2 {
  background-color: blue;
  color: white;
}
.white {
  background-color: inherit;
}
</style>
