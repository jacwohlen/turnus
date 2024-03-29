<template>
  <div>
    <h1>Categories</h1>
    <v-data-table
      :headers="headers"
      :items="items"
      @click:row="viewCategoryDetails"
      hide-default-footer
      disable-pagination
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <CategoryForm />
        </v-toolbar>
      </template>
      <template v-slot:item.weights="{ item }">
        <v-item-group>
          <v-item v-for="w in item.weights" :key="w.name">
            <v-chip>
              {{ w.name }}
            </v-chip>
          </v-item>
        </v-item-group>
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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { categoriesStore, poolsStore } from '~/store'
import { Category } from '~/types/models'

interface header {
  text: string
  value: string
  sortable?: boolean
}

@Component({
  layout: 'DashboardLayout',
  async fetch() {
    await categoriesStore.init()
    // FIXME: remove once these are merged or
    // the dependency is removed by e.g. letting the pools page
    // create the pools depending on the categories found
    await poolsStore.init()
  },
})
export default class CategoriesPage extends Vue {
  async mounted() {
    await categoriesStore.init()
    await poolsStore.init()
  }

  headers: header[] = [
    { text: 'Name', value: 'name' },
    { text: 'Sex', value: 'sex' },
    { text: 'Ages From', value: 'ageFrom' },
    { text: 'Ages To', value: 'ageTo' },
    { text: 'Weights', value: 'weights' },
    { text: 'Actions', value: 'actions', sortable: false },
  ]

  selectedCategory: Category | null = null

  get items() {
    return categoriesStore.list
  }

  viewCategoryDetails(item: Category): void {
    this.selectedCategory = item
  }
}
</script>
