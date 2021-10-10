<template>
  <v-container v-if="!actualMatch">
    <span>Kein Kampf im moment... :)</span>
  </v-container>
  <v-container v-else fluid pt-0 pb-0>
    <v-row class="border">
      <v-col class="tatami" md="2">{{ tatami.name }}</v-col>
      <v-col class="pool" md="8" align="center">{{ pool.name }}</v-col>
      <v-col md="2"></v-col>
    </v-row>
    <v-row>
      <v-col class="red2" md="6">
        <v-row>
          <v-col class="competitor">
            {{ actualMatch.competitorRed.name }}
          </v-col>
        </v-row>
        <v-row>
          <v-col class="club">{{ actualMatch.competitorRed.club }}</v-col>
        </v-row>
      </v-col>
      <v-col class="white" md="6">
        <v-row>
          <v-col class="competitor">
            {{ actualMatch.competitorWhite.name }}
          </v-col>
        </v-row>
        <v-row>
          <v-col class="club">{{ actualMatch.competitorWhite.club }}</v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="border">
      <v-col class="red2" md="6">
        <v-row class="score">
          <v-col align="center">
            {{ actualMatch.competitorRed.score.ippon }}
          </v-col>
          <v-col align="center">
            {{ actualMatch.competitorRed.score.wazari }}
          </v-col>
          <v-col align="center">
            {{ actualMatch.competitorRed.score.shido }}
          </v-col>
        </v-row>
        <v-row class="scorelegend">
          <v-col align="center"> Ippon </v-col>
          <v-col align="center"> Wazari </v-col>
          <v-col align="center"> Shido </v-col>
        </v-row>
      </v-col>
      <v-col class="white" md="6">
        <v-row class="score">
          <v-col align="center">
            {{ actualMatch.competitorRed.score.ippon }}
          </v-col>
          <v-col align="center">
            {{ actualMatch.competitorRed.score.wazari }}
          </v-col>
          <v-col align="center">
            {{ actualMatch.competitorRed.score.shido }}
          </v-col>
        </v-row>
        <v-row class="scorelegend">
          <v-col align="center"> Ippon </v-col>
          <v-col align="center"> Wazari </v-col>
          <v-col align="center"> Shido </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="border">
      <v-col class="flag" md="3">Flag</v-col>
      <v-col class="clock" md="6" align="center">{{ clock }}</v-col>
      <v-col class="flag" md="3">Flag</v-col>
    </v-row>
    <v-row class="border">
      <v-col class="next" md="1">Next</v-col>
      <v-col class="red2" md="5">
        <v-row>
          <v-col class="nextCompetitor">{{
            nextMatch.competitorRed.name
          }}</v-col>
        </v-row>
        <v-row>
          <v-col class="nextCompetitorClub">{{
            nextMatch.competitorRed.club
          }}</v-col>
        </v-row>
      </v-col>
      <v-col class="white" md="5">
        <v-row>
          <v-col class="nextCompetitor">{{
            nextMatch.competitorWhite.name
          }}</v-col>
        </v-row>
        <v-row>
          <v-col class="nextCompetitorClub">{{
            nextMatch.competitorWhite.club
          }}</v-col>
        </v-row>
      </v-col>
      <v-col md="1"></v-col>
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
import { Tatami } from '~/types/models'

@Component({
  layout: 'ScreenLayout',
  async asyncData({ params }) {
    await schedulerStore.init()
    await competitorsStore.init()
    await poolsStore.init()
    if (!params.tatamiId) {
      alertStore.setError({ msg: 'Missing tatamiId' })
      return
    }
    const tatami = schedulerStore.getTatamiById(params.tatamiId)
    if (!tatami) {
      alertStore.setError({
        msg: `Tatami with Id '${params.tatamiId}' not found.`,
      })
      return
    }
    // FIXME: prevent page from loading...
    // maybe middleware?
    return { tatami }
  },
})
export default class extends Vue {
  tatami: Tatami = { id: '', name: '' }

  clock = '4:00'

  get pool() {
    return poolsStore.getPoolById(this.actualMatch!.poolId)
  }

  get actualMatch() {
    const match = schedulerStore.getActualMatch(this.tatami.id)
    if (!match) return
    const comp1 = competitorsStore.getCompetitorById(match.fighter1Id)
    const comp2 = competitorsStore.getCompetitorById(match.fighter2Id)
    return {
      competitorRed: {
        name: comp1!.lastname.toUpperCase() + ' ' + comp1!.firstname,
        club: comp1!.club,
        score: { ippon: 0, wazari: 0, shido: 0 },
      },
      competitorWhite: {
        name: comp2!.lastname.toUpperCase() + ' ' + comp2!.firstname,
        club: comp2!.club,
        score: { ippon: 0, wazari: 0, shido: 0 },
      },
      poolId: match.poolId,
    }
  }

  get nextMatch() {
    const match = schedulerStore.getNextMatch(this.tatami.id)
    if (!match) return
    const comp1 = competitorsStore.getCompetitorById(match.fighter1Id)
    const comp2 = competitorsStore.getCompetitorById(match.fighter2Id)
    return {
      competitorRed: {
        name: comp1!.lastname.toUpperCase() + ' ' + comp1!.firstname,
        club: comp1!.club,
        score: { ippon: 0, wazari: 0, shido: 0 },
      },
      competitorWhite: {
        name: comp2!.lastname.toUpperCase() + ' ' + comp2!.firstname,
        club: comp2!.club,
        score: { ippon: 0, wazari: 0, shido: 0 },
      },
    }
  }

  win() {
    // set score
    this.next()
  }
  next() {
    schedulerStore.next(this.tatami.id)
  }
  previous() {
    schedulerStore.next(this.tatami.id)
  }
}
</script>
<style>
.container div {
  padding-top: 0;
  padding-bottom: 0;
}
.border {
  border-bottom: solid black 1px;
}
.tatami {
  font-size: 3vh;
  font-weight: bold;
}
.pool {
  font-size: 4vh;
}
.competitor {
  font-size: 7.5vh;
  font-weight: bold;
}
.club {
  font-size: 4.2vh;
}
.score {
  font-size: 16vh;
  font-weight: bold;
}
.scorelegend {
  font-size: 3vh;
  font-weight: bold;
}
.clock {
  font-size: 21vh;
  font-weight: bold;
}
.flag {
  font-size: 1vh;
}
.next {
  font-size: 3.2vh;
}
.nextCompetitor {
  font-size: 4.2vh;
  font-weight: bold;
}
.nextCompetitorClub {
  font-size: 3vh;
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
