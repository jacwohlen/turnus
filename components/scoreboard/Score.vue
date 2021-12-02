<template>
  <div>
    <v-row no-gutters>
      <v-col cols="4" class="d-flex flex-column align-center">
        <v-btn @click="incrementScore(scores.Ippon)"><v-icon>mdi-arrow-up</v-icon></v-btn>
        <p class="my-3 text-h1 font-weight-bold">{{ score.ippon }}</p>
        <v-btn @click="decrementScore(scores.Ippon)"><v-icon>mdi-arrow-down</v-icon></v-btn>
        <p class="ma-0 text-h5">Ippon</p>
      </v-col>
      <v-col cols="4" class="d-flex flex-column align-center">
        <v-btn @click="incrementScore(scores.Wazari)"><v-icon>mdi-arrow-up</v-icon></v-btn>
        <p class="my-3 text-h1 font-weight-bold">{{ score.wazari }}</p>
        <v-btn @click="decrementScore(scores.Wazari)"><v-icon>mdi-arrow-down</v-icon></v-btn>
        <p class="ma-0 text-h5">Wazari</p>
      </v-col>
      <v-col cols="4" class="d-flex flex-column align-center">
        <v-btn @click="incrementScore(scores.Shido)"><v-icon>mdi-arrow-up</v-icon></v-btn>
        <p class="my-3 text-h1 font-weight-bold">{{ score.shido }}</p>
        <v-btn @click="decrementScore(scores.Shido)"><v-icon>mdi-arrow-down</v-icon></v-btn>
        <p class="ma-0 text-h5">Shido</p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import _ from 'lodash' // for deep cloning

import { matchRunnerStore } from '~/store'

import { Fighter } from '~/types/models'

enum Scores {
  Ippon = 1,
  Wazari = 2,
  Shido = 3,
}

@Component
export default class Score extends Vue {
  @Prop({ type: String, required: true })
  matchId!: string

  @Prop({ type: Number, required: true })
  fighter!: Fighter

  scores: any = Scores

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

  async incrementScore(score: Scores) {
    const fscore = _.clone(this.score)

    if (Scores.Ippon === score) {
      if (fscore.ippon < 1) {
        fscore.ippon = this.score.ippon + 1
      }
    } else if (Scores.Wazari === score) {
      fscore.wazari = fscore.wazari + 1
    } else if (Scores.Shido === score) {
      fscore.shido = fscore.shido + 1
    }
    await matchRunnerStore.setScore({
      matchId: this.matchId,
      fighter: this.fighter,
      score: fscore,
    })
  }

  async decrementScore(score: Scores) {
    const fscore = _.clone(this.score)
    if (Scores.Ippon === score) {
      if (fscore.ippon > 0) {
        fscore.ippon = fscore.ippon - 1
      }
    } else if (Scores.Wazari === score) {
      if (fscore.wazari > 0) {
        fscore.wazari = fscore.wazari - 1
      }
    } else if (Scores.Shido === score) {
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
