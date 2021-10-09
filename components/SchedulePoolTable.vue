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
        <td :colspan="2">
          <v-btn :ref="group" small icon @click="toggle" :data-open="isOpen">
            <v-icon v-if="isOpen">mdi-chevron-up</v-icon>
            <v-icon v-else>mdi-chevron-down</v-icon>
          </v-btn>
          <span class="mx-5 font-weight-bold">{{ group }}</span>
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
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Component from 'vue-class-component'

import { schedulerStore } from '~/store'
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
  $refs!: HTMLFormElement

  headers = [
    { text: '', value: '' },
    { text: 'Match #', value: 'n' },
    { text: 'Progress', value: 'progress' },
    { text: 'Action', value: 'action' },
  ]

  get tatamis(): Tatami[] {
    return schedulerStore.getTatamis
  }

  mounted() {
    this.closeAll()
  }

  // onCutDrop(e) {
  //   this.cut.push(e.data)
  // }

  // remove(n) {
  //   const index = this.pools.indexOf(n)
  //   this.pools.splice(index, 1)
  // }

  closeAll() {
    Object.keys(this.$refs).forEach((k) => {
      if (this.$refs[k] && this.$refs[k].$attrs['data-open']) {
        this.$refs[k].$el.click()
      }
    })
  }
}
</script>
