<template>
  <div>
    <v-row no-gutters>
      <v-col cols="4" align="center">
        <v-row no-gutters>
          <v-col cols="12">
            <v-btn @click="incrementScore(Score.Ippon)"> Up </v-btn>
          </v-col>
          <v-col cols="12" class="score">
            {{ score.ippon }}
          </v-col>
          <v-col cols="12">
            <v-btn @click="decrementScore(Score.Ippon)">Down</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" align="center">
        <v-row no-gutters>
          <v-col cols="12">
            <v-btn @click="incrementScore(Score.Wazari)"> Up </v-btn>
          </v-col>
          <v-col cols="12" class="score">
            {{ score.wazari }}
          </v-col>
          <v-col cols="12">
            <v-btn @click="decrementScore(Score.Wazari)">Down</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" align="center">
        <v-row no-gutters>
          <v-col cols="12">
            <v-btn @click="incrementScore(Score.Shido)"> Up </v-btn>
          </v-col>
          <v-col cols="12" class="score">
            {{ score.shido }}
          </v-col>
          <v-col cols="12">
            <v-btn @click="decrementScore(Score.Shido)">Down</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" class="scorelegend" align="center"> Ippon </v-col>
      <v-col cols="4" class="scorelegend" align="center"> Wazari </v-col>
      <v-col cols="4" class="scorelegend" align="center"> Shido </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import _ from 'lodash' // for deep cloning

import { matchRunnerStore } from '~/store'

import { Fighter } from '~/types/models'

enum Score {
  Ippon = 1,
  Wazari = 2,
  Shido = 3,
}

@Component
export default class About extends Vue {
  @Prop({ type: String, required: true })
  matchId!: string

  @Prop({ type: Number, required: true })
  fighter!: Fighter

  Score: any = Score

  get score() {
    if (Fighter.Red === this.fighter) return matchRunnerStore.getScoreRed
    else return matchRunnerStore.getScoreWhite
  }

  async created() {
    // FIXME: SOMEHOW STORE IS NOT DONE WITH INITIALIZATION
    // BEFOR get score() IS CALLED...
    // https://stackoverflow.com/questions/53006986/vuejs-computed-property-is-calculated-before-created-in-component
    await matchRunnerStore.init(this.matchId)
  }

  async incrementScore(score: Score) {
    const fscore = _.clone(this.score)

    if (Score.Ippon === score) {
      if (fscore.ippon < 1) {
        fscore.ippon = this.score.ippon + 1
      }
    } else if (Score.Wazari === score) {
      fscore.wazari = fscore.wazari + 1
    } else if (Score.Shido === score) {
      fscore.shido = fscore.shido + 1
    }
    await matchRunnerStore.setScore({
      matchId: this.matchId,
      fighter: this.fighter,
      score: fscore,
    })
  }

  async decrementScore(score: Score) {
    const fscore = _.clone(this.score)
    if (Score.Ippon === score) {
      if (fscore.ippon > 0) {
        fscore.ippon = fscore.ippon - 1
      }
    } else if (Score.Wazari === score) {
      if (fscore.wazari > 0) {
        fscore.wazari = fscore.wazari - 1
      }
    } else if (Score.Shido === score) {
      if (fscore.shido > 0) {
        fscore.shido = fscore.shido - 1
      }
    }
    await matchRunnerStore.setScore({
      matchId: this.matchId,
      fighter: this.fighter,
      score: fscore,
    })
  }
}
</script>
