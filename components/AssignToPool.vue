<template>
  <v-row v-if="editable" no-gutters align="center">
    <v-col>
      <v-select
        v-model="potentialPool"
        return-object
        :items="pools"
        item-text="name"
        multiple
        persistent-hint
      ></v-select>
    </v-col>
    <v-col>
      <v-icon @click="moveCompetitorToSelectedPools()"> mdi-check</v-icon>
    </v-col>
  </v-row>

  <v-row v-else no-gutters align="center">
    <v-col>
      <v-item-group>
        <v-item v-for="(pool, idx) in getPoolsByCompetitor" :key="idx">
          <v-chip>{{ pool.name }}</v-chip>
        </v-item>
      </v-item-group>
    </v-col>
    <v-col>
      <v-icon @click="editable = true"> mdi-pencil</v-icon>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Component from 'vue-class-component'

import { poolsStore } from '~/store'
import { Competitor, Pool } from '~/types/models'

const PrefilledProps = Vue.extend({
  props: {
    competitor: {
      type: Object as PropType<Competitor>,
      required: true,
    },
  },
})

@Component
export default class AssignToPool extends PrefilledProps {
  potentialPool: Pool[] = []
  editable: boolean = true

  get pools() {
    return poolsStore.list
  }

  get getPoolsByCompetitor() {
    if (this.competitor.pools) {
      return this.competitor.pools
    }
    return []
    // FIXME: Move back into store?
    // return poolsStore.getPoolsByCompetitor(this.competitor.id)
    // const t = this
    // const ret = poolsStore.list.filter(function (e: Pool) {
    //   if (e.competitors) {
    //     return Object.hasOwnProperty(e.competitors, t.competitor.id)
    //   }
    //   return false
    // })
    // return ret
  }

  async mounted() {
    this.editable = !this.getPoolsByCompetitor.length

    this.potentialPool = this.getPoolsByCompetitor
    if (this.potentialPool.length === 0) {
      this.potentialPool = await poolsStore.getPotentialPools(this.competitor)
    }
  }

  async moveCompetitorToSelectedPools() {
    await poolsStore.setCompetitorInPools({
      competitor: this.competitor,
      pools: this.potentialPool,
    })
    this.editable = false
  }
}
</script>
