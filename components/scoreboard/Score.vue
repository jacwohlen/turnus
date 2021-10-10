<template>
  <v-container>
    <v-row class="score">
      <v-col align="center">
        <v-row no-gutters>
          <v-col cols="12">
            <v-btn depressed><v-icon>mdi-arrow-up-drop-circle</v-icon></v-btn>
          </v-col>
          <v-col cols="12">
            {{ score.ippon }}
          </v-col>
          <v-col cols="12">
            <v-btn depressed><v-icon>mdi-arrow-down-drop-circle</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col align="center">
        {{ score.wazari }}
      </v-col>
      <v-col align="center">
        {{ score.shido }}
      </v-col>
    </v-row>
    <v-row class="scorelegend">
      <v-col align="center"> Ippon </v-col>
      <v-col align="center"> Wazari </v-col>
      <v-col align="center"> Shido </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Component from 'vue-class-component'

import { alertStore } from '~/store'

import { MatchScore } from '~/types/models'

const PrefilledProps = Vue.extend({
  props: {
    score: {
      type: Object as PropType<MatchScore>,
      required: true,
    },
  },
})

@Component
export default class extends PrefilledProps {}
</script>
