<template>
  <div>
    <PageTitle title="Schedule" />
    <TatamiForm />
    <v-row>
      <v-col v-for="tatami in tatamis" :key="tatami.id" md="6" sm="12">
        <TatamiSchedule :tatami="tatami" />
      </v-col>
    </v-row>

    <SchedulePoolTable :matches="matchesUnscheduled">
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <ol>
            <li v-for="(comp, idx) in item.competitors" :key="idx">
              {{ comp.firstname }} {{ comp.lastname }} ({{ comp.weightMeasured }})
            </li>
          </ol>
        </td>
      </template>
    </SchedulePoolTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { schedulerStore } from '~/store';
import { Match } from '~/types/models';
import TatamiForm from '~/components/TatamiForm.vue';
import TatamiSchedule from '~/components/TatamiSchedule.vue';
import SchedulePoolTable from '~/components/SchedulePoolTable.vue';
import PageTitle from '~/components/common/PageTitle.vue';

@Component({
  components: { PageTitle, SchedulePoolTable, TatamiSchedule, TatamiForm },
  layout: 'DashboardLayout',
})
export default class Schedule extends Vue {
  private get matchesUnscheduled(): Match[] {
    return schedulerStore.matches;
  }

  private get tatamis() {
    return schedulerStore.getTatamis;
  }

  public async fetch() {
    await schedulerStore.init();
  }

  public async mounted() {
    await schedulerStore.init();
  }
}
</script>
