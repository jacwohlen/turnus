<template>
  <v-container v-if="!actualMatch">
    <span>Kein Kampf im moment... :)</span>
  </v-container>
  <v-container v-else fluid class="pa-0 grey lighten-3">
    <v-row no-gutters>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col class="tatami" md="2">{{ tatami.name }}</v-col>
          <v-col class="pool" md="8" align="center">{{ pool.name }}</v-col>
          <v-col md="2"></v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col class="blue darken-3 white--text" md="6">
            <v-row no-gutters>
              <v-col cols="12" class="competitor text-truncate">
                {{ actualCompetitorRed | name }}
              </v-col>
              <v-col cols="12" class="club">{{
                actualCompetitorRed | club
              }}</v-col>
            </v-row>
          </v-col>
          <v-col class="white" md="6">
            <v-row no-gutters>
              <v-col cols="12" class="competitor text-truncate">
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
        <v-row no-gutters>
          <v-col class="blue darken-3 white--text" md="6">
            <!-- <ScoreboardScore :score="scoreRed" /> -->
            <v-row no-gutters class="score">
              <v-col cols="4" align="center">
                {{ scoreWhite.ippon }}
              </v-col>
              <v-col cols="4" align="center">
                {{ scoreWhite.wazari }}
              </v-col>
              <v-col cols="4" align="center">
                {{ scoreWhite.shido }}
              </v-col>
              <v-col cols="4" class="scorelegend" align="center"> Ippon </v-col>
              <v-col cols="4" class="scorelegend" align="center">
                Wazari
              </v-col>
              <v-col cols="4" class="scorelegend" align="center"> Shido </v-col>
            </v-row>
          </v-col>
          <v-col class="white" md="6">
            <v-row no-gutters class="score">
              <v-col cols="4" align="center">
                {{ scoreWhite.ippon }}
              </v-col>
              <v-col cols="4" align="center">
                {{ scoreWhite.wazari }}
              </v-col>
              <v-col cols="4" align="center">
                {{ scoreWhite.shido }}
              </v-col>
              <v-col cols="4" class="scorelegend" align="center"> Ippon </v-col>
              <v-col cols="4" class="scorelegend" align="center">
                Wazari
              </v-col>
              <v-col cols="4" class="scorelegend" align="center"> Shido </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col class="flag" md="3">Flag</v-col>
          <v-col class="clock" md="6" align="center">{{ clock }}</v-col>
          <v-col class="flag" md="3">Flag</v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row no-gutters>
          <v-col class="next" md="1">Next</v-col>
          <v-col class="blue darken-3 white--text" md="5">
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
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import {
  schedulerStore,
  alertStore,
  competitorsStore,
  poolsStore,
} from '~/store'
import { Tatami, Competitor } from '~/types/models'

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
  clock = '4:00'
  scoreRed = { ippon: 0, wazari: 0, shido: 0 }
  scoreWhite = { ippon: 0, wazari: 0, shido: 0 }

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
}
</script>
<style lang="scss" scoped>
.container {
  line-height: 1.163;
  overflow: hidden;
}
.tatami {
  font-size: 6vh;
  font-weight: bold;
}
.pool {
  font-size: 7vh;
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
.clock {
  font-size: 24vh;
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

.white {
  background-color: inherit;
}
</style>
