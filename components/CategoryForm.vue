<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="prefilled.empty"
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Add New
      </v-btn>
      <v-icon v-else small class="mr-2" v-bind="attrs" v-on="on">
        mdi-pencil
      </v-icon>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add Category</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.name"
                    :rules="nameRules"
                    :counter="20"
                    label="Name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="item.ages"
                    label="Ages"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-autocomplete
                    v-model="item.sex"
                    :items="sexes"
                    label="Sex"
                    placeholder="Select..."
                    required
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12">
                  <v-combobox
                    v-model="item.weights"
                    label="Weights"
                    multiple
                  ></v-combobox>
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
        <v-btn
          v-if="prefilled.empty"
          color="blue darken-1"
          text
          :disabled="!valid"
          @click="add"
        >
          Add
        </v-btn>
        <v-btn
          v-else
          color="blue darken-1"
          text
          :disabled="!valid"
          @click="edit"
        >
          Edit
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
      default: () => ({ empty: true }),
    },
  },
  data() {
    return {
      dialog: false,
      item: Object.assign({}, this.prefilled),
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      menu: false,
      valid: true,
      sexes: ['male', 'female', 'mixed'],
    }
  },
  methods: {
    add() {
      this.$store.commit('categories/add', {
        name: this.item.name,
        sex: this.item.sex,
        ages: this.item.ages,
        weights: this.item.weights,
      })
      this.dialog = false
    },
    edit() {
      this.$store.commit('categories/update', {
        id: this.item.id,
        name: this.item.name,
        sex: this.item.sex,
        ages: this.item.ages,
        weights: this.item.weights,
      })
      this.dialog = false
    },
  },
}
</script>
