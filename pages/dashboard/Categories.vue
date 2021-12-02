<template>
  <div>
    <PageTitle title="Categories" />
    <v-data-table
      :headers="headers"
      :items="items"
      :item-class="selectedItemBg"
      disable-pagination
      hide-default-footer
      @click:row="viewCategoryDetails"
    >
      <template #top>
        <v-toolbar flat>
          <v-spacer />
          <CategoryForm />
        </v-toolbar>
      </template>
      <template #[`item.weights`]="{ item }">
        <v-item-group>
          <v-item v-for="w in item.weights" :key="w.name">
            <v-chip>
              {{ w.name }}
            </v-chip>
          </v-item>
        </v-item-group>
      </template>
      <template #[`item.actions`]="{ item }">
        <CategoryForm :prefilled="item" />
      </template>
    </v-data-table>

    <v-container v-if="selectedCategory">
      <v-row>
        <v-col v-for="(wclass, idx) in selectedCategory.weights" :key="idx" md="6" sm="12">
          <v-card>
            <v-card-title>{{ selectedCategory.name }} {{ wclass.name }}</v-card-title>
            <v-card-subtitle>{{ wclass.weightFrom }} - {{ wclass.weightTo }}</v-card-subtitle>
            <v-card-text>
              <CategoryMembersList :category="selectedCategory" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';
import { categoriesStore, poolsStore } from '~/store';
import { Category } from '~/types/models';
import PageTitle from '~/components/common/PageTitle.vue';
import CategoryForm from '~/components/CategoryForm.vue';
import CategoryMembersList from '~/components/CategoryMembersList.vue';

@Component({
  components: { CategoryMembersList, CategoryForm, PageTitle },
  layout: 'DashboardLayout',
})
export default class CategoriesPage extends Vue {
  private headers: DataTableHeader<Category>[] = [
    { text: 'Name', value: 'name' },
    { text: 'Sex', value: 'sex' },
    { text: 'Ages From', value: 'ageFrom' },
    { text: 'Ages To', value: 'ageTo' },
    { text: 'Weights', value: 'weights' },
    { text: 'Actions', value: 'actions', sortable: false },
  ];

  private selectedCategory: Category | null = null

  private get items(): Category[] {
    return categoriesStore.list;
  }

  private viewCategoryDetails(item: Category): void {
    this.selectedCategory = item;
  }

  private selectedItemBg(item: Category): string | null {
    return item.id === this.selectedCategory?.id ? 'active' : null;
  }

  public async fetch() {
    await categoriesStore.init();
    // FIXME: remove once these are merged or
    // the dependency is removed by e.g. letting the pools page
    // create the pools depending on the categories found
    await poolsStore.init();
  }

  public async mounted() {
    await categoriesStore.init();
    await poolsStore.init();
  }
}
</script>
