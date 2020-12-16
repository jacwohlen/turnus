<template>
  <div>
    <h1>Categories</h1>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <CategoryForm />
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <CategoryForm :prefilled="item" />
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Sex', value: 'sex' },
      { text: 'Ages', value: 'ages' },
      { text: 'Weights', value: 'weights' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: null,
    editedItem: null,
    dialog: false,
  }),
  computed: {
    items() {
      return this.$store.state.categories.list
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(/* item */) {},
  },
}
</script>
