<template>
  <div>
    <h1>Schedule</h1>
    <v-container style="background-color: yellow" fill-height fluid pl-0 pr-0>
      <!-- FIXME: justify property does not work as intended -->
      <v-row justify="end">
        <v-col v-for="(tatami, idx) in tatamis" :key="idx" md="3">
          <v-card>
            <v-card-title>{{ tatami.name }}</v-card-title>
            <v-row>
              <v-col>
                <nuxt-link to="">Operator Board</nuxt-link>
                <nuxt-link to="Scoreboard">Scoreboard</nuxt-link>
              </v-col>
            </v-row>
            <v-row>
              <v-col> Actual Fight </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="headers"
                  :items="pool_running_on_tatami(tatami)"
                  hide-default-footer
                >
                </v-data-table>
              </v-col>
            </v-row>
            <v-row>
              <v-col> Next </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="headers"
                  :items="pools_scheduled_on_tatami(tatami)"
                  hide-default-footer
                >
                </v-data-table>
              </v-col>
            </v-row>
          </v-card>
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
    pool_running_on_tatami(tatami) {
      return this.$store.state.pools.list.filter(
        (pool) =>
          pool.status === 'running' && pool.tatami_scheduled === tatami.id
      )
    },
    pools_scheduled_on_tatami(tatami) {
      return this.$store.state.pools.list.filter(
        (pool) => pool.status === 'ready' && pool.tatami_scheduled === tatami.id
      )
    },
    pools_unscheduled() {
      return this.$store.state.pools.list.filter(
        (pool) => pool.status === 'ready'
      )
    },
    schedule(pool, tatami) {
      this.$store.commit('pools/schedule', pool.id, tatami)
    },
    unschedule(pool) {
      this.$store.commit('pools/unschedule', pool.id)
    },
  },
}
</script>
