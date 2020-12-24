<template>
  <v-card>
    <v-toolbar dense flat>
      <v-toolbar-title>{{ tatami.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-desktop-mac</v-icon>
      </v-btn>

      <v-btn to="Scoreboard" icon>
        <v-icon>mdi-projector-screen</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col><v-subheader>Actual Fight</v-subheader></v-col>
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
      <v-col><v-subheader>Next</v-subheader></v-col>
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
</template>

<script>
export default {
  props: {
    tatami: { type: Object, required: true },
  },
  data: () => ({
    headers: [
      { text: 'Pool', value: 'name' },
      { text: 'Progress', value: 'progress' },
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
