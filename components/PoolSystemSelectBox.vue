<template>
  <div>
    <v-select
      v-model="selectedSystem"
      :value="pool.system"
      :items="poolSystems"
      @change="setPoolSystem"
    >
    </v-select>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Component from 'vue-class-component'

import { poolsStore } from '~/store'
import { Pool, PoolSystem } from '~/types/models'

const PrefilledProps = Vue.extend({
  props: {
    pool: {
      type: Object as PropType<Pool>,
      required: true,
    },
  },
})

@Component
export default class extends PrefilledProps {
  selectedSystem: PoolSystem = this.pool.system

  get poolSystems() {
    return [PoolSystem.ROUND_ROBIN, PoolSystem.BRESIL]
  }

  async setPoolSystem() {
    await poolsStore.setPoolSystem({
      id: this.pool.id,
      system: this.selectedSystem,
    })
  }
}
</script>
