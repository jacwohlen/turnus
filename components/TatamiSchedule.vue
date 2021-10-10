<template>
  <v-card>
    <v-toolbar dense flat>
      <v-toolbar-title>{{ tatami.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="'scoreboard/' + tatami.id" icon>
        <v-icon>mdi-desktop-mac</v-icon>
      </v-btn>

      <v-btn :to="'scoreboard/view/' + tatami.id" icon>
        <v-icon>mdi-projector-screen</v-icon>
      </v-btn>
      <TatamiForm :prefilled="tatami" />
    </v-toolbar>
    <v-row>
      <v-col>
        <v-subheader>Actual Fight</v-subheader>
        <div v-if="actualMatch">
          {{ actualMatch.fighter1Id }} vs {{ actualMatch.fighter2Id }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <SchedulePoolTable :matches="matchesScheduled" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { schedulerStore } from '~/store'

const PrefilledProps = Vue.extend({
  props: {
    tatami: { type: Object, required: true },
  },
})

@Component
export default class extends PrefilledProps {
  get matchesScheduled() {
    return schedulerStore.getMachtesScheduledOnTatami(this.tatami.id)
  }

  get actualMatch() {
    return schedulerStore.getCurrentMatch(this.tatami.id)
  }
}
</script>
