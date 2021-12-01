<template>
  <div>
    <h1>Weigh In</h1>
    <v-card>
      <v-card-title>
        Competitors
        <v-spacer/>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          hide-details
          label="Search"
          single-line
        />
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
import {competitorsStore, categoriesStore, poolsStore} from '~/store'
import {Component, Vue} from 'vue-property-decorator';
import {Competitor} from '~/types/models';
import {DataTableHeader} from 'vuetify';

@Component({
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

  private get items(): Competitor[] {
    return competitorsStore.list;
  }

  public async fetch() {
    await competitorsStore.init();
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
