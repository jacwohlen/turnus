<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    @keydown.esc="dialog = false"
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-if="pool.tatami_scheduled === null">
        <v-btn v-bind="attrs" v-on="on"> Schedule Pool </v-btn>
      </div>
      <div v-else>
        <SafeButton :execute="unschedule" />
      </div>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Schedule Pool</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="valid">
            <v-container>
              <v-select
                v-model="selected_tatami"
                :items="tatamis"
                item-text="name"
                item-value="id"
                required
              ></v-select>
            </v-container>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn :disabled="!valid" @click="schedule"> Schedule </v-btn>
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
    tatamis: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      dialog: false,
      valid: false,
      confirm: false,
      selected_tatami: null,
    }
  },
  methods: {
    schedule() {
      this.$store.commit('pools/schedule', {
        id: this.pool.id,
        tatamiId: this.selected_tatami,
      })
      this.dialog = false
    },
    unschedule() {
      this.$store.commit('pools/unschedule', this.pool.id)
    },
  },
}
</script>
