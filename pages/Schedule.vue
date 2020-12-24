<template>
  <div>
    <h1>Schedule</h1>
    <v-container fill-height fluid pl-0 pr-0>
      <!-- FIXME: justify property does not work as intended -->
      <v-row justify="space-between">
        <v-col v-for="(tatami, idx) in tatamis" :key="idx" md="3">
          <TatamiSchedule :tatami="tatami" />
        </v-col>
      </v-row>
    </v-container>

    <v-data-table
      :headers="headers"
      :items="pools_unscheduled()"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
    >
      <template v-slot:item.actions="{ item }">
        <SchedulePoolForm :pool="item" :tatamis="tatamis" />
      </template>
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
    </v-data-table>
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
    headers: [
      { text: 'Pool', value: 'name' },
      { text: 'Size', value: 'size' },
      { text: 'System', value: 'system' },
      { text: 'Actions', value: 'actions' },
    ],
  }),
  computed: {},
  methods: {
    pools_unscheduled() {
      return this.$store.state.pools.list.filter(
        (pool) => pool.status === 'ready'
      )
    },
    schedule(pool, tatami) {
      this.$store.commit('pools/schedule', pool.id, tatami)
    },
  },
}
</script>
