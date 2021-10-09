<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    @keydown.esc="dialog = false"
  >
    <template v-slot:activator="{ on, attrs }">
      <div
        v-if="
          matches[0].tatamiScheduled === null ||
          matches[0].tatamiScheduled === undefined
        "
      >
        <v-btn v-bind="attrs" v-on="on" small> Schedule Pool </v-btn>
      </div>
      <div v-else>
        <SafeButton @confirmed="unschedule"> Unschedule </SafeButton>
      </div>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Schedule Pool</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="valid">
            <v-container>
              <v-select
                v-model="selectedTatami"
                :items="tatamis"
                item-text="name"
                return-object
                required
              ></v-select>
            </v-container>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn :disabled="selectedTatami === null" @click="schedule">
          Schedule
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Component from 'vue-class-component'

import { alertStore, schedulerStore } from '~/store'

import { Match, Tatami } from '~/types/models'

const PrefilledProps = Vue.extend({
  props: {
    matches: {
      type: Array as PropType<Array<Match>>,
      required: true,
    },
  },
})

@Component
export default class extends PrefilledProps {
  dialog: boolean = false
  valid: boolean = false
  confirm: boolean = false
  selectedTatami: Tatami | null = null

  get tatamis() {
    return schedulerStore.getTatamis
  }

  schedule() {
    if (this.selectedTatami === null) {
      alertStore.setError({
        msg: 'Please select tatami first in order to schedule the matches',
      })
      return
    }
    schedulerStore.scheduleMatches({
      matches: this.matches,
      tatamiId: this.selectedTatami.id,
    })
    this.dialog = false
  }

  unschedule() {
    schedulerStore.unscheduleMatches({ matches: this.matches })
  }
}
</script>
