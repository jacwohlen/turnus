<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    @keydown.esc="dialog = false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon small class="mr-2" v-bind="attrs" v-on="on">
        mdi-file-tree
      </v-icon>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Draw View</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <!-- <MyBracket :rounds="rounds"> </MyBracket> -->
        </v-container>
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
      default() {
        return { empty: true }
      },
    },
    system: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialog: false,
      rounds: [
        // Semi finals
        {
          games: [
            {
              player1: { id: '1', name: 'Competitor 1', winner: false },
              player2: { id: '4', name: 'Competitor 4', winner: true },
            },
            {
              player1: { id: '5', name: 'Competitor 5', winner: false },
              player2: { id: '8', name: 'Competitor 8', winner: true },
            },
          ],
        },
        // Third place play off
        {
          games: [
            {
              player1: { id: '1', name: 'Competitor 1', winner: false },
              player2: { id: '5', name: 'Competitor 5', winner: true },
            },
          ],
        },
        // Final
        {
          games: [
            {
              player1: { id: '4', name: 'Competitor 4', winner: false },
              player2: { id: '8', name: 'Competitor 8', winner: true },
            },
          ],
        },
      ],
    }
  },
  methods: {},
}
</script>
