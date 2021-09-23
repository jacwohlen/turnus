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
        <SchedulePoolTable
          :pools="pool_running_on_tatami()"
          :tatamis="tatamis"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col><v-subheader>Next</v-subheader></v-col>
    </v-row>
    <v-row>
      <v-col>
        <SchedulePoolTable
          :pools="pool_scheduled_on_tatami()"
          :tatamis="tatamis"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    tatami: { type: Object, required: true },
    tatamis: { type: Array, required: true },
  },
  data: () => ({}),
  computed: {},
  methods: {
    pool_running_on_tatami() {
      return this.$store.state.pools.list.filter(
        (pool) =>
          pool.status === 'running' && pool.tatamiScheduled === this.tatami.id
      )
    },
    pool_scheduled_on_tatami() {
      return this.$store.state.pools.list.filter(
        (pool) =>
          pool.status === 'ready' && pool.tatamiScheduled === this.tatami.id
      )
    },
  },
}
</script>
