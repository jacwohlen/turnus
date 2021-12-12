<template>
  <div>
    <PageTitle title="Weigh in" />
    <v-card>
      <v-card-title>
        Competitors
        <v-spacer />
        <SearchInput v-model="search" />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        disable-pagination
        hide-default-footer
      >
        <template #[`item.action`]="{ item }">
          <CheckinForm :prefilled="item" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';
import { Competitor } from '~/types/models';
import CheckinForm from '~/components/CheckinForm.vue';
import SearchInput from '~/components/common/SearchInput.vue';
import { categoriesStore, competitorsStore, poolsStore } from '~/utils/store-accessor';
import PageTitle from '~/components/common/PageTitle.vue';

@Component({
  components: { PageTitle, SearchInput, CheckinForm },
  layout: 'DashboardLayout',
})
export default class WeighIn extends Vue {
  private search: string = '';
  private headers: DataTableHeader<Competitor>[] = [
    { text: 'Firstname', value: 'firstname' },
    { text: 'Lastname', value: 'lastname' },
    { text: 'Sex', value: 'sex' },
    { text: 'Birthday', value: 'birthyear' },
    { text: 'Club', value: 'club' },
    { text: 'Given Weight', value: 'weight' },
    { text: 'Measured Weight', value: 'weightMeasured' },
    { text: 'Action', value: 'action' },
  ];

  // noinspection JSMethodCanBeStatic
  private get items(): Competitor[] {
    return competitorsStore.list;
  }

  public async fetch() {
    await competitorsStore.init();
    await categoriesStore.init();
    await poolsStore.init();
  }

  public async mounted() {
    await competitorsStore.init();
    await categoriesStore.init();
    await poolsStore.init();
  }
}
</script>
