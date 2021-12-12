<template>
  <v-container fluid class="pa-0">
    <v-toolbar>
      <v-toolbar-title>Operator</v-toolbar-title>
      <v-btn icon>
        <v-icon>mdi-coffee</v-icon>
      </v-btn>
      <v-btn icon @click="previous()">
        <v-icon>mdi-skip-previous</v-icon>
      </v-btn>
      <v-col cols="1">
        <v-progress-linear height="25">
          <strong>{{ stats.done }}/{{ stats.total }}</strong>
        </v-progress-linear>
      </v-col>
      <v-btn icon @click="next()">
        <v-icon>mdi-skip-next</v-icon>
      </v-btn>
      <v-spacer />
      <p class="text-h3"><span v-if="tatami">{{ tatami.name }}</span><span v-if="pool"> - {{ pool.name }}</span></p>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <span v-if="!actualMatch">Kein Kampf im moment... :)</span>
    <div v-else class="grey lighten-3">
      <v-row class="pa-3">
        <v-col class="blue darken-3 white--text" md="6">
          <p class="text-h3 text-truncate">{{ actualCompetitorRed | name }}</p>
          <p class="text-h4 text-truncate">{{ actualCompetitorRed | club }}</p>
          <Score :matchId="actualMatch.id" :fighter="fighter.Red" />
        </v-col>
        <v-col class="white" md="6">
          <p class="text-h3 text-truncate">{{ actualCompetitorWhite | name }}</p>
          <p class="text-h4 text-truncate">{{ actualCompetitorWhite | club }}</p>
          <Score :matchId="actualMatch.id" :fighter="fighter.White" />
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" offset-md="3">
          <Clock :matchId="actualMatch.id" :useTimer="true" />
        </v-col>
      </v-row>
      <v-divider />
      <v-row class="pa-3">
        <v-col md="12">
          <p class="ma-0 text-h4">Next</p>
        </v-col>
        <v-col class="blue darken-3 white--text" md="6">
          <p class="text-h4 text-truncate">{{ nextCompetitorRed | name }} </p>
          <p class="text-h5 text-truncate">{{ nextCompetitorRed | club }}</p>
        </v-col>
        <v-col class="white" md="6">
          <p class="text-h4 text-truncate">{{ nextCompetitorWhite | name }} </p>
          <p class="text-h5 text-truncate">{{ nextCompetitorWhite | club }}</p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { schedulerStore, alertStore, competitorsStore, poolsStore } from '~/store';
import { Tatami, Competitor, Fighter, SchedulerStats, Pool, Match } from '~/types/models';
import Score from '~/components/scoreboard/Score.vue';
import Clock from '~/components/Clock.vue';

Vue.filter('name', function (c: Competitor | null) {
  return c !== null ? `${c.lastname.toUpperCase()} ${c.firstname}` : '';
});

Vue.filter('club', function (c: Competitor | null) {
  return c?.club ?? '';
});

@Component({
  components: { Clock, Score },
  layout: 'ScreenLayout',
})
export default class ScoreBoardOperator extends Vue {
  private tatami: Tatami = { id: '', name: '' } // set in created()
  private fighter: Fighter = Fighter.Red;

  private get tatamiId(): string {
    return this.$route.params.tatamiId;
  }

  private get stats(): SchedulerStats {
    return schedulerStore.getStats(this.tatami.id);
  }

  private get pool(): Pool | null {
    if (!this.actualMatch) {
      return null;
    }
    return poolsStore.getPoolById(this.actualMatch.poolId);
  }

  private get actualCompetitorRed(): Competitor | null {
    if (!this.actualMatch) {
      return null;
    }
    return competitorsStore.getCompetitorById(this.actualMatch.fighter1Id);
  }

  private get actualCompetitorWhite(): Competitor | null {
    if (!this.actualMatch) {
      return null;
    }
    return competitorsStore.getCompetitorById(this.actualMatch.fighter2Id);
  }

  private get actualMatch(): Match | null {
    return schedulerStore.getActualMatch(this.tatami.id);
  }

  private get nextCompetitorRed(): Competitor | null {
    if (!this.nextMatch) {
      return null;
    }
    return competitorsStore.getCompetitorById(this.nextMatch.fighter1Id);
  }

  private get nextCompetitorWhite(): Competitor | null {
    if (!this.nextMatch) {
      return null;
    }
    return competitorsStore.getCompetitorById(this.nextMatch!.fighter2Id);
  }

  private get nextMatch(): Match | null {
    return schedulerStore.getNextMatch(this.tatami.id);
  }

  private next(): void {
    // FIXME: Only move next after scoring..
    schedulerStore.next(this.tatami.id);
  }

  private previous(): void {
    schedulerStore.previous(this.tatami.id);
  }

  public async fetch() {
    await schedulerStore.init();
    await competitorsStore.init();
    await poolsStore.init();

    if (!this.tatamiId) {
      alertStore.setError({ msg: 'Missing tatamiId' });
    }
  }

  public async created() {
    await schedulerStore.init();
    await competitorsStore.init();
    await poolsStore.init();

    if (!this.tatamiId) {
      alertStore.setError({ msg: 'Missing tatamiId' });
      return;
    }

    const tatami = schedulerStore.getTatamiById(this.tatamiId);
    if (!tatami) {
      alertStore.setError({ msg: `Tatami with Id ${this.tatamiId} not found.` });
      return;
    }
    this.tatami = tatami;
  }
}
</script>

<style lang="scss" scoped>

</style>
