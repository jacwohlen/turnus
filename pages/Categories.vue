<template>
  <div>
    <h1>Categories</h1>
    <v-data-table
      :headers="headers"
      :items="items"
      @click:row="viewCategoryDetails"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <CategoryForm />
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <CategoryForm :prefilled="item" />
      </template>
    </v-data-table>

    <v-container v-if="selectedCategory">
      <v-card v-for="(wclass, idx) in selectedCategory.weights" :key="idx">
        <h1>{{ selectedCategory.name }} {{ wclass }}</h1>
        <CategoryMembersList :category="selectedCategory" />
      </v-card>
    </v-container>
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
    selectedCategory: null,
  }),
  computed: {
    items() {
      return this.$store.state.categories.list
    },
  },
  methods: {
    viewCategoryDetails(item) {
      this.selectedCategory = item
    },
  },
}
</script>
