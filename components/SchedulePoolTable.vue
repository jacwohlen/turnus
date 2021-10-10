<template>
  <div>
    <v-data-table
      name="expandableTable"
      :headers="headers"
      :items="matches"
      item-key="id"
      group-by="poolId"
      disable-sort
      hide-default-footer
      :expanded="[]"
    >
      <template v-slot:group.header="{ items, group, headers, toggle, isOpen }">
        <td :colspan="headers.length - 2">
          <v-btn :ref="group" small icon @click="toggle" :data-open="isOpen">
            <v-icon v-if="isOpen">mdi-chevron-up</v-icon>
            <v-icon v-else>mdi-chevron-down</v-icon>
          </v-btn>
          <span class="mx-5 font-weight-bold">{{ getPoolName(group) }}</span>
        </td>
        <td>
          <!-- Progress -->
          <v-progress-linear height="25">
            <strong>0/{{ items.length }}</strong>
          </v-progress-linear>
        </td>
        <td>
          <!-- Action -->
          <SchedulePoolForm :matches="items" />
        </td>
      </template>
      <template v-slot:item.fighter1Id="{ item }">
        {{getFighterName(item.fighter1Id)}}
      </template>
      <template v-slot:item.fighter2Id="{ item }">
        {{getFighterName(item.fighter2Id)}}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Component from 'vue-class-component'

import { poolsStore, schedulerStore, competitorsStore } from '~/store'
import { Tatami } from '~/types/models'

const PrefilledProps = Vue.extend({
  props: {
    matches: {
      type: Array,
      required: true,
    },
  },
})

@Component
export default class extends PrefilledProps {
  async mounted(){
    await poolsStore.init()
    // FIXME: Cannot init schedulerStore here (luckily it's initialized 
    // on Schedule Page. When you uncomment the line below you will see a
    // busy loop in the web... tatamis get binded over and toggles it's value...)
    // await schedulerStore.init()
    await competitorsStore.init()
    this.closeAll()
  }
  $refs!: HTMLFormElement

  headers = [
    { text: 'Match', value: 'n' },
    { text: 'Fighter1', value: 'fighter1Id' },
    { text: 'Fighter2', value: 'fighter2Id' },
    { text: 'Progress', value: 'progress' },
    { text: 'Action', value: 'action' },
  ]

  get tatamis(): Tatami[] {
    return schedulerStore.getTatamis
  }

  getPoolName(poolId: string){
    const p = poolsStore.getPoolById(poolId)
    return p ? p.name : poolId
  }

  getFighterName(competitorId: string){
    const p = competitorsStore.getCompetitorById(competitorId)
    return p ? p.lastname.toUpperCase() + ' ' + p.firstname : competitorId
  }

  closeAll() {
    Object.keys(this.$refs).forEach((k) => {
      if (this.$refs[k] && this.$refs[k].$attrs['data-open']) {
        this.$refs[k].$el.click()
      }
    })
  }
}
</script>
