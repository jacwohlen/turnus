<template>
  <div>
    <h1>Weigh In</h1>
    <v-card>
      <v-card-title>
        Competitors
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="items" :search="search">
        <template v-slot:item.weightMeasured="{ item }">
          {{ item.weightMeasured }}
          <WeighForm :prefilled="item" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { competitorsStore } from '~/store'

export default {
  layout: 'DashboardLayout',
  async fetch() {
    await competitorsStore.init()
  },
  async mounted() {
    await competitorsStore.init()
  },
  data: () => ({
    search: '',
    headers: [
      { text: 'Firstname', value: 'firstname' },
      { text: 'Lastname', value: 'lastname' },
      { text: 'Sex', value: 'sex' },
      { text: 'Birthday', value: 'birthyear' },
      { text: 'Club', value: 'club' },
      { text: 'Given Weight', value: 'weight' },
      { text: 'Measured Weight', value: 'weightMeasured' },
    ],
    selectedCategory: null,
  }),
  computed: {
    items() {
      return competitorsStore.list
    },
  },
}
</script>
