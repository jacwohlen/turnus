<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    @keydown.esc="dialog = false"
  >
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
      <div v-else>
        <v-icon v-show="!confirm" small class="mr-2" v-bind="attrs" v-on="on">
          mdi-pencil
        </v-icon>
        <v-icon v-show="!confirm" small @click="confirm = !confirm">
          mdi-delete
        </v-icon>
        <v-btn
          v-show="confirm"
          x-small
          color="primary"
          dark
          @click="confirm = !confirm"
        >
          Cancel
        </v-btn>
        <v-btn v-show="confirm" x-small color="error" dark @click="remove()">
          Delete
        </v-btn>
      </div>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add Category</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="valid">
            <v-container>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.name"
                    :rules="nameRules"
                    :counter="20"
                    label="Name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="item.ageFrom"
                    type="number"
                    label="Years From (including)"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="item.ageTo"
                    type="number"
                    label="Years To"
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
                  <v-data-table
                    :items="item.weights"
                    :headers="weight_headers"
                    hide-default-footer
                    disable-sort
                  >
                    <template v-slot:body.append>
                      <tr>
                        <td>
                          <v-text-field
                            v-model="weight_name"
                            label="Name"
                          ></v-text-field>
                        </td>
                        <td>
                          <v-text-field
                            v-model="weightFrom"
                            type="number"
                            label="From"
                          ></v-text-field>
                        </td>
                        <td>
                          <v-text-field
                            v-model="weightTo"
                            type="number"
                            label="To"
                          ></v-text-field>
                        </td>
                        <td>
                          <v-icon small class="mr-2" @click="addWeight()">
                            mdi-plus-circle
                          </v-icon>
                        </td>
                      </tr>
                    </template>
                    <template v-slot:item.action="{ item }">
                      <v-icon small class="mr-2" @click="removeWeight(item)">
                        mdi-delete
                      </v-icon>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-container>
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
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from 'lodash' // for deep cloning
import { categoriesStore } from '~/store'

export default {
  props: {
    prefilled: {
      type: Object,
      default: () => ({ empty: true, weights: [] }),
    },
  },
  data() {
    return {
      dialog: false,
      confirm: false,
      item: _.cloneDeep(this.prefilled),
      itemId: this.prefilled['.key'],
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ],
      menu: false,
      valid: true,
      sexes: ['male', 'female', 'mixed'],
      weight_headers: [
        { text: 'Name', value: 'name' },
        { text: 'From', value: 'weightFrom' },
        { text: 'To', value: 'weightTo' },
        { text: '', value: 'action' },
      ],
      weight_name: '',
      weightFrom: '',
      weightTo: '',
    }
  },
  methods: {
    add() {
      categoriesStore.addCategoryAndCreatePools({
        name: this.item.name,
        sex: this.item.sex,
        ageFrom: this.item.ageFrom,
        ageTo: this.item.ageTo,
        weights: this.item.weights,
      })
      this.dialog = false
    },
    edit() {
      categoriesStore.updateCategoryAndRecreatePools({
        id: this.itemId,
        name: this.item.name,
        sex: this.item.sex,
        ageFrom: this.item.ageFrom,
        ageTo: this.item.ageTo,
        weights: this.item.weights,
      })
      this.dialog = false
    },
    remove() {
      categoriesStore.removeCategoryAndPools({
        id: this.itemId,
      })
    },
    removeWeight(item) {
      const idx = this.item.weights.indexOf(item)
      this.item.weights.splice(idx, 1)
    },
    addWeight() {
      if (this.weight_name === '') {
        this.weight_name = '-' + this.weightTo + 'kg'
      }
      this.item.weights.push({
        name: this.weight_name,
        weightFrom: this.weightFrom,
        weightTo: this.weightTo,
      })
      this.weight_name = ''
      this.weightFrom = this.weightTo
      this.weightTo = ''

      this.item.weights.sort((a, b) => a.weightFrom - b.weightFrom)
    },
  },
}
</script>
