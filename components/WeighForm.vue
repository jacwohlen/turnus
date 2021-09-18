<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    @keydown.esc="dialog = false"
  >
    <template v-slot:activator="{ on, attrs }">
      <span v-if="prefilled.weightMeasured !== null">
        <SafeButton :execute="remove" />
      </span>
      <span v-else>
        <v-icon small class="mr-2" v-bind="attrs" v-on="on">
          mdi-speedometer
        </v-icon>
      </span>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Measure Weight</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    :value="item.firstname"
                    label="Name"
                    disabled
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    :value="item.lastname"
                    label="Name"
                    disabled
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    :value="item.weight"
                    label="Registered Weigth"
                    suffix="kg"
                    disabled
                    type="number"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="item.weightMeasured"
                    label="Actual Weight"
                    suffix="kg"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text :disabled="!valid" @click="add">
          Add Weight
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    prefilled: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      confirm: false,
      item: Object.assign({}, this.prefilled),
      valid: true,
    }
  },
  methods: {
    add() {
      this.$store.commit('competitors/addWeight', {
        id: this.item.id,
        weight: this.item.weightMeasured,
      })
      this.dialog = false
    },
    remove() {
      this.$store.commit('competitors/removeWeight', this.item.id)
    },
  },
}
</script>
