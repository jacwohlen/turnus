<template>
  <div>
    <h1>Schedule</h1>
    <v-container fill-height fluid pl-0 pr-0>
      <!-- FIXME: justify property does not work as intended -->
      <TatamiForm />
      <v-row justify="space-between">
        <v-col v-for="tatami in tatamis" :key="tatami.id">
          <TatamiSchedule :tatami="tatami" />
        </v-col>
      </v-row>
    </v-container>

    <SchedulePoolTable :matches="matchesUnscheduled">
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <ol>
            <li v-for="(comp, idx) in item.competitors" :key="idx">
              {{ comp.firstname }} {{ comp.lastname }} ({{
                comp.weightMeasured
              }})
            </li>
          </ol>
        </td>
      </template>
    </SchedulePoolTable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { schedulerStore } from '~/store'

@Component({
  layout: 'DashboardLayout',
})
export default class extends Vue {
  async mounted(){
    await schedulerStore.init()
  }

  get tatamis() {
    return schedulerStore.getTatamis
  }

  expanded = []

  get matchesUnscheduled() {
    return schedulerStore.matches
  }
}
</script>
