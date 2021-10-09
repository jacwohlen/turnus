<template>
  <v-card>
    <v-toolbar dense flat>
      <v-toolbar-title>{{ tatami.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-desktop-mac</v-icon>
      </v-btn>

      <v-btn to="Scoreboard" icon>
        <v-icon>mdi-projector-screen</v-icon>
      </v-btn>
      <TatamiForm :prefilled="tatami" />
    </v-toolbar>
    <v-row>
      <v-col><v-subheader>Actual Fight</v-subheader></v-col>
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
}
</script>
