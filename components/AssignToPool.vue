<template>
  <v-row
    v-if="editable || getPoolsByCompetitor === []"
    no-gutters
    align="center"
  >
    <v-col>
      <v-select
        v-model="potentialPool"
        return-object
        :items="pools"
        item-text="name"
        multiple
        persistent-hint
      ></v-select>
    </v-col>
    <v-col>
      <v-icon @click="moveToPools()"> mdi-check</v-icon>
    </v-col>
  </v-row>

  <v-row v-else no-gutters align="center">
    <v-col>
      <v-item-group>
        <v-item v-for="(pool, idx) in getPoolsByCompetitor" :key="idx">
          <v-chip>{{ pool.name }}</v-chip>
        </v-item>
      </v-item-group>
    </v-col>
    <v-col>
      <v-icon @click="editable = true"> mdi-pencil</v-icon>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    competitor: {
      type: Object,
      default: () => ({ empty: true }),
    },
  },
  data: () => ({
    potentialPool: [],
    editable: true,
  }),
  computed: {
    pools() {
      return this.$store.state.pools.list
    },
    getPoolsByCompetitor() {
      return this.$store.getters['pools/getPoolsByCompetitor'](this.competitor)
    },
  },
  mounted() {
    this.potentialPool = this.getPoolsByCompetitor
    if (this.potentialPool.length === 0) {
      this.potentialPool = this.$store.getters['pools/getPotentialPools'](
        this.competitor
      )
    }
  },
  methods: {
    moveToPools() {
      this.$store.commit('pools/removeCompetitorFromAllPools', {
        competitor: this.competitor,
      })
      this.potentialPool.forEach((pool) => {
        this.$store.commit('pools/addCompetitorToPool', {
          competitor: this.competitor,
          pool,
        })
      })
      this.editable = false
    },
  },
}
</script>
