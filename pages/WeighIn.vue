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
        <template v-slot:item.weight_measured="{ item }">
          {{ item.weight_measured }}
          <WeighForm :prefilled="item" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: '',
    headers: [
      { text: 'Firstname', value: 'firstname' },
      { text: 'Lastname', value: 'lastname' },
      { text: 'Sex', value: 'sex' },
      { text: 'Birthday', value: 'birthyear' },
      { text: 'Club', value: 'club' },
      { text: 'Given Weight', value: 'weight' },
      { text: 'Measured Weight', value: 'weight_measured' },
    ],
    selectedCategory: null,
  }),
  computed: {
    items() {
      return this.$store.state.competitors.list
    },
  },
}
</script>
