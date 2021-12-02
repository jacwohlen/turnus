<template>
  <div>
    <h1>Weigh In</h1>
    <v-card>
      <v-card-title>
        Competitors
        <v-spacer/>
        <SearchInput v-model="search" />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:item.action="{ item }">
          <CheckinForm :prefilled="item"/>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Competitor} from '~/types/models';
import {DataTableHeader} from 'vuetify';
import CheckinForm from "~/components/CheckinForm.vue";
import SearchInput from "~/components/common/SearchInput.vue";
import {categoriesStore, competitorsStore, poolsStore} from "~/utils/store-accessor";

@Component({
  components: {SearchInput, CheckinForm},
  layout: 'DashboardLayout',
})
export default class WeighIn extends Vue {
  private search: string = '';
  private headers: DataTableHeader<Competitor>[] = [
    {text: 'Firstname', value: 'firstname'},
    {text: 'Lastname', value: 'lastname'},
    {text: 'Sex', value: 'sex'},
    {text: 'Birthday', value: 'birthyear'},
    {text: 'Club', value: 'club'},
    {text: 'Given Weight', value: 'weight'},
    {text: 'Measured Weight', value: 'weightMeasured'},
    {text: 'Action', value: 'action'}
  ];

  // noinspection JSMethodCanBeStatic
  private get items(): Competitor[] {
    return competitorsStore.list;
  }

  public async fetch() {
    competitorsStore.init();
    categoriesStore.init();
    poolsStore.init();
  }

  public async mounted() {
    competitorsStore.init();
    categoriesStore.init();
    poolsStore.init();
  }
}
</script>
