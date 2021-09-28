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
      <v-row v-else>
        <v-btn v-if="!prefilled.generated" small v-bind="attrs" v-on="on">
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <SafeButton v-if="!prefilled.generated" @confirmed="remove">
          <v-icon small>mdi-delete</v-icon>
        </SafeButton>
        <slot />
      </v-row>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add Pool</span>
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

                <v-col cols="12">
                  <v-select :value="item.system" :items="systems"></v-select>
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

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import _ from 'lodash' // for deep cloning
import { poolsStore } from '~/store'

import { PoolSystem, Pool } from '~/types/models'

const PrefilledProps = Vue.extend({
  props: {
    prefilled: {
      type: Object,
      default: () => ({ empty: true, weights: [] }),
    },
  },
})

@Component
export default class extends PrefilledProps {
  systems: PoolSystem[] = [PoolSystem.ROUND_ROBIN, PoolSystem.BRESIL]
  dialog: boolean = false
  confirm: boolean = false
  item: Pool = _.cloneDeep(this.prefilled)
  nameRules: any[] = [
    (v: any) => !!v || 'Name is required',
    (v: any) => (v && v.length <= 20) || 'Name must be less than 20 characters',
  ]

  valid: boolean = true

  add(): void {
    poolsStore.add({
      name: this.item.name,
      system: this.item.system,
      generated: false,
      generationSource: null,
      criteria: null,
    })
    this.dialog = false
  }

  edit(): void {
    poolsStore.edit({
      id: this.item.id,
      name: this.item.name,
      system: this.item.system,
    })
    this.dialog = false
  }

  remove(): void {
    poolsStore.remove({ id: this.item.id })
  }
}
</script>
