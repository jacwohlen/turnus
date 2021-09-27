<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    @keydown.esc="dialog = false"
  >
    <template v-slot:activator="{ on, attrs }">
      <span v-if="prefilled.weightMeasured !== undefined">
        <SafeButton :execute="remove" />
      </span>
      <span v-else>
        <v-btn small class="mr-2" v-bind="attrs" v-on="on">
          Checkin
        </v-btn>
      </span>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Checkin - Measure Weight</span>
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
                    @keypress="updateMatchingPools"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-combobox
                    v-model="item.pools"
                    label="Starts in"
                    :items="pools"
                    item-text="name"
                    item-value="id"
                    clearable
                    hide-selected
                    multiple
                    small-chips
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
        <v-btn color="blue darken-1" text :disabled="!valid" @click="add">
          Checkin
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { competitorsStore, poolsStore } from '~/store'
import { Competitor } from '~/types/models'

const PrefilledProps = Vue.extend({
  props: {
    prefilled: {
      type: Object,
      required: true,
    },
  },
})

@Component
export default class WeightForm extends PrefilledProps {
  dialog: boolean = false
  confirm: boolean = false
  itemId: string = this.prefilled['.key']
  item: Competitor = Object.assign({}, this.prefilled)
  valid: boolean = true
  matchingPools = []

  get pools(): Pool[] {
    return poolsStore.list
  }

  add(): void {
    // FIXME: Checkin and create pools association
    competitorsStore.addWeight({
      id: this.itemId,
      weight: this.item.weightMeasured!!, // !! will throw NPE (NullPointerException if null)
    })
    this.dialog = false
  }

  remove(): void {
    competitorsStore.removeWeight(this.itemId)
  }

  async updateMatchingPools(): Pool[] {
    this.item.pools = await poolsStore.getPotentialPools(this.item)
  }
}
</script>
