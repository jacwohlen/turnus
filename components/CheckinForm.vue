<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
    persistent
    @keydown.esc="dialog = false"
  >
    <template v-slot:activator="{ on, attrs }">
      <span v-if="checkedIn">
        <SafeButton class="mr-2" small @confirmed="reset">Reset</SafeButton>
      </span>
      <span v-else>
        <v-btn class="mr-2 primary" small v-bind="attrs" v-on="on">
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
                    disabled
                    label="Name"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    :value="item.lastname"
                    disabled
                    label="Name"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    :value="item.weight"
                    disabled
                    label="Registered Weigth"
                    suffix="kg"
                    type="number"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="item.weightMeasured"
                    label="Actual Weight"
                    required
                    suffix="kg"
                    type="number"
                    @keypress="updateMatchingPools"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-combobox
                    v-model="item.pools"
                    :items="pools"
                    clearable
                    hide-selected
                    item-text="name"
                    item-value="id"
                    label="Starts in"
                    multiple
                    small-chips
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn :disabled="!valid" color="blue darken-1" text @click="checkin">
          Checkin
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">

import {competitorsStore, poolsStore} from '~/store'
import {Competitor, CompetitorStatus, Pool} from '~/types/models'
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class CheckinForm extends Vue {
  @Prop({type: Object, required: true})
  public prefilled!: Competitor;

  private dialog: boolean = false;
  private item: Competitor = Object.assign({}, this.prefilled);
  private valid: boolean = true;

  private get checkedIn(): boolean {
    return CompetitorStatus.CheckedIn === this.prefilled.status;
  }

  private get pools(): Pool[] {
    return poolsStore.list;
  }

  private checkin(): void {
    competitorsStore.checkin({
      competitor: this.item,
      weight: this.item.weightMeasured!!, // !! will throw NPE (NullPointerException if null)
      pools: this.item.pools!!
    });
    this.dialog = false;
  }

  private reset(): void {
    competitorsStore.checkout({id: this.item.id});
  }

  private async updateMatchingPools(): Promise<void> {
    this.item.pools = await poolsStore.getPotentialPools(this.item); // todo: is this really async?
  }
}
</script>
