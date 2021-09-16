<template>
  <div>
    <h1>Schedule</h1>
    <v-container fill-height fluid pl-0 pr-0>
      <!-- FIXME: justify property does not work as intended -->
      <v-row justify="space-between">
        <v-col v-for="(tatami, idx) in tatamis" :key="idx" sm="6" md="4">
          <TatamiSchedule :tatami="tatami" :tatamis="tatamis" />
        </v-col>
      </v-row>
    </v-container>

    <SchedulePoolTable :pools="pools_unscheduled()" :tatamis="tatamis">
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <ol>
            <li v-for="(comp, idx) in item.competitors" :key="idx">
              {{ comp.firstname }} {{ comp.lastname }} ({{
                comp.weight_measured
              }})
            </li>
          </ol>
        </td>
      </template>
    </SchedulePoolTable>
  </div>
</template>

<script>
export default {
  data: () => ({
    tatamis: [
      { id: 0, name: 'Tatami 1' },
      { id: 1, name: 'Tatami 2' },
      { id: 2, name: 'Tatami 3' },
    ],
    expanded: [],
  }),
  computed: {},
  methods: {
    pools_unscheduled() {
      return this.$store.state.pools.list.filter(
        (pool) => pool.status === 'ready'
      )
    },
  },
}
</script>
