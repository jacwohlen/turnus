<template>
  <div>
    <PageTitle title="Competitors" />
    <CompetitorForm />
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">First Name</th>
          <th class="text-left">Last Name</th>
          <th class="text-left">Sex</th>
          <th class="text-left">Birthday</th>
          <th class="text-left">Club</th>
          <th class="text-left">Weight</th>
          <th class="text-left">Pools</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in items" :key="idx">
          <td>{{ item.firstname }}</td>
          <td>{{ item.lastname }}</td>
          <td>{{ item.sex }}</td>
          <td>{{ item.birthyear }}</td>
          <td>{{ item.club }}</td>
          <td>{{ item.weight }}</td>
          <td>
            <v-chip v-for="p in item.pools" :key="p.id">{{ p.name }}</v-chip>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { competitorsStore } from '~/store';
import { Competitor } from '~/types/models';
import PageTitle from '~/components/common/PageTitle.vue';
import CompetitorForm from '~/components/CompetitorForm.vue';

@Component({
  components: { CompetitorForm, PageTitle },
  layout: 'DashboardLayout',
})
export default class Competitors extends Vue {
  private get items(): Competitor[] {
    return competitorsStore.list;
  }

  public async fetch() {
    await competitorsStore.init();
  }

  public async mounted() {
    await competitorsStore.init();
  }
}
</script>
