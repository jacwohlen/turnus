<template>
  <div>
    <h1>Pools</h1>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Pools Preparation</v-card-title>
          <v-data-table
            :headers="headers"
            :items="pools"
            item-key="name"
            group-by="generationSource.name"
            disable-sort
            hide-default-footer
          >
            <template v-slot:group.header="{ group, headers, toggle, isOpen }">
              <td :colspan="headers.length">
                <v-btn :ref="group" small icon @click="toggle">
                  <v-icon v-if="isOpen">mdi-minus</v-icon>
                  <v-icon v-else>mdi-plus</v-icon>
                </v-btn>
                <span class="mx-5 font-weight-bold">{{ group }}</span>
              </td>
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <PoolForm />
              </v-toolbar>
            </template>
            <template v-slot:item.size="{ item }">
              <PoolCompetitorList :pool="item" />
            </template>
            <template v-slot:item.system="{ item }">
              <v-row no-gutters align="center">
                <v-col>
                  <PoolSystemSelectBox :pool="item" />
                </v-col>
                <v-col>
                  <PoolDrawView :pool="item" :system="item.system" />
                </v-col>
              </v-row>
            </template>
            <template v-slot:item.info="{ item }">
              <v-tooltip v-if="item.generated" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on"> mdi-information</v-icon>
                </template>
                <span>This pool was generated by the category</span>
              </v-tooltip>
            </template>
            <template v-slot:item.actions="{ item }">
              <PoolForm :prefilled="item">
                <v-btn small @click="setReadyForSchedule(item)">
                  Push to Schedule
                </v-btn>
              </PoolForm>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="competitorsHeaders"
          :items="unassignedPeople"
          disable-sort
          hide-default-footer
        >
          <template v-slot:item.potential_pools="{ item }">
            <AssignToPool :competitor="item" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>Pools Ready Scheduled </v-card-title>
      <v-data-table
        :headers="poolsReadyHeaders"
        :items="poolsReady"
        item-key="name"
        disable-sort
        hide-default-footer
      >
        >
        <template v-slot:item.size="{ item }">
          <PoolCompetitorList :pool="item" :readonly="true" />
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn @click="setNotReadyForSchedule(item)"> Take back </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// FIXME: Should not need to initialize competitors Store here...
// Maybe move it into init of poolsStore?
import { poolsStore, competitorsStore, alertStore } from '~/store'
import { Pool, PoolSystem } from '~/types/models'

@Component({
  layout: 'DashboardLayout',
  async fetch() {
    // server side
    await competitorsStore.init()
    await poolsStore.init()
  },
})
export default class CategoriesPage extends Vue {
  async mounted() {
    // client side
    await competitorsStore.init()
    await poolsStore.init()
  }

  systems: PoolSystem[] = [PoolSystem.ROUND_ROBIN, PoolSystem.BRESIL]
  headers: any = [
    { text: 'Pool', value: 'name' },
    { text: 'Size', value: 'size' },
    { text: 'System', value: 'system' },
    { text: 'Info', value: 'info' },
    { text: 'Status', value: 'status' },
    { text: 'Actions', value: 'actions' },
  ]

  competitorsHeaders: any = [
    { text: 'Firstname', value: 'firstname' },
    { text: 'Lastname', value: 'lastname' },
    { text: 'Birthyear', value: 'birthyear' },
    { text: 'Weight', value: 'weightMeasured' },
    { text: 'Potential Pools', value: 'potential_pools' },
    { text: 'Actions', value: 'actions' },
  ]

  poolsReadyHeaders: any = [
    { text: 'Pool', value: 'name' },
    { text: 'Size', value: 'size' },
    { text: 'System', value: 'system' },
    { text: 'Actions', value: 'actions' },
  ]

  get pools() {
    return poolsStore.pools
  }

  get poolsReady() {
    return poolsStore.poolsReady
  }

  get unassignedPeople() {
    return this.$store.state.competitors.list
  }

  setReadyForSchedule(pool: Pool): void {
    poolsStore.ready(pool).catch((err) => {
      alertStore.setError({ msg: err })
    })
  }

  setNotReadyForSchedule(pool: Pool): void {
    poolsStore.notReady(pool)
  }
}
</script>
