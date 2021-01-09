<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    @keydown.esc="dialog = false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="ma-2" text icon v-bind="attrs" v-on="on">
        <v-icon left>mdi-account-multiple-outline</v-icon>
        {{ pool.competitors.length }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ pool.name }} Competitors</span>
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Firsname</th>
                <th class="text-left">Lasname</th>
                <th class="text-left">Weight</th>
                <th v-if="pool.status === 'not ready'" class="text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in pool.competitors" :key="idx">
                <td>{{ item.firstname }}</td>
                <td>{{ item.lastname }}</td>
                <td>{{ item.weight }}</td>
                <td v-if="pool.status === 'not ready'">
                  <v-btn @click="removeCompetitorFromPool(item)">
                    Remove
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    pool: {
      type: Object,
      required: true,
      default: () => ({ empty: true }),
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    removeCompetitorFromPool(competitor) {
      this.$store.commit('pools/removeCompetitorFromPool', {
        competitor,
        pool: this.pool,
      })
    },
  },
}
</script>
