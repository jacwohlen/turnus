<template>
  <div>
    <h1>Pools</h1>
    <v-card>
      <v-card-title>Pools Preparation</v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :expanded.sync="expanded"
        item-key="name"
        show-expand
      >
        <template v-slot:item.system="{ item }">
          <v-row>
            <v-col>
              <v-select :value="item.system" :items="systems"></v-select>
            </v-col>
            <v-col>
              <DrawView :pool="item" :system="item.system" />
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn @click="setReadyForSchedule(item)"> Push to Schedule </v-btn>
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
    </v-card>
    <v-card>
      <v-card-title>Pools Ready Scheduled </v-card-title>
      <v-data-table
        :headers="pools_ready_headers"
        :items="pools_ready_items"
        item-key="name"
        show-expand
      >
        <template v-slot:item.actions="{ item }">
          <v-btn @click="setNotReadyForSchedule(item)"> Take back </v-btn>
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
    </v-card>
  </div>
</template>

<script>
import DrawView from '~/components/DrawView.vue'
export default {
  components: { DrawView },
  data: () => ({
    expanded: [],
    systems: ['Round Robin', 'Bresil'],
    headers: [
      { text: 'Pool', value: 'name' },
      { text: 'Size', value: 'size' },
      { text: 'System', value: 'system' },
      { text: 'Actions', value: 'actions' },
    ],
    pools_ready_headers: [
      { text: 'Pool', value: 'name' },
      { text: 'Size', value: 'size' },
      { text: 'System', value: 'system' },
      { text: 'Actions', value: 'actions' },
    ],
  }),
  computed: {
    items() {
      return this.$store.state.pools.list.filter(
        (pool) => pool.status === 'not ready'
      )
    },
    pools_ready_items() {
      return this.$store.state.pools.list.filter(
        (pool) => pool.status === 'ready'
      )
    },
  },
  methods: {
    setReadyForSchedule(pool) {
      this.$store.commit('pools/ready', pool.id)
    },
    setNotReadyForSchedule(pool) {
      this.$store.commit('pools/notReady', pool.id)
    },
  },
}
</script>
