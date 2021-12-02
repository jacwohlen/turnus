<template>
  <div>
    <div class="d-flex justify-center align-center">
      <div class="mx-6">
        <v-btn @click="incMin">+ Min</v-btn>
        <v-btn @click="decMin">- Min</v-btn>
      </div>
      <time class="clock">
        {{ time }}
      </time>
      <div class="mx-6">
        <v-btn @click="incSec">+ Sec</v-btn>
        <v-btn @click="decSec">- Sec</v-btn>
      </div>
    </div>
    <div class="d-flex justify-center">
      <v-btn
        v-if="!state.started"
        class="mx-3"
        color="success"
        @click="start"
      >
        <v-icon left>mdi-play</v-icon>
        Start
      </v-btn>
      <v-btn
        v-else
        class="mx-3"
        color="warning"
        @click="stop"
      >
        <v-icon left>mdi-pause</v-icon>
        Stop
      </v-btn>
      <v-btn
        class="mx-3"
        color="error"
        @click="reset"
      >
        <v-icon left>mdi-restart</v-icon>
        Restart
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { matchRunnerStore } from '~/store';
import { MatchState } from '~/types/models';

@Component
export default class Clock extends Vue {
  @Prop({ type: String, required: true })
  public matchId!: string

  @Prop(Boolean)
  public useTimer!: boolean | undefined

  private timeElapsedMs: number = 0;
  private interval: NodeJS.Timeout[] = [];
  private timer: Date = new Date(0);

  private get state(): MatchState {
    return matchRunnerStore.matchState;
  }

  private get time() {
    let t = new Date(this.timeElapsedMs);
    if (this.useTimer) {
      t = new Date(this.timer.getTime() - this.timeElapsedMs);
    }
    const min = t.getUTCMinutes();
    const sec = t.getUTCSeconds();
    return min + ':' + Clock.zeroPrefix(sec, 2);
  }

  @Watch('state.started')
  private onStartStop(value: boolean) {
    this.timeElapsedMs = this.state.timeElapsedMs;
    if (value) {
      this.interval.push(setInterval(this.clockRunning, 100));
    } else {
      this.clearInterval();
    }
  }

  private get timerMs(): number {
    return matchRunnerStore.getTimerMs;
  }

  @Watch('timerMs')
  private syncTimerValue(value: number): void {
    this.timer = new Date(value);
  }

  private async start() {
    let timeBeganMs = this.state.timeBeganMs;
    let stoppedDurationMs = 0;
    if (this.state.started && this.interval.length > 0) {
      return;
    }

    if (this.state.timeBeganMs === 0) {
      this.reset();
      timeBeganMs = new Date().getTime();
    }

    if (this.state.timeStoppedMs !== 0) {
      stoppedDurationMs =
        this.state.stoppedDurationMs +
        new Date().getTime() -
        this.state.timeStoppedMs;
    }

    await matchRunnerStore.updateMatchState({
      timeBeganMs,
      timeStoppedMs: this.state.timeStoppedMs,
      stoppedDurationMs,
      started: true,
      timeElapsedMs: 0,
    });
    this.interval.push(setInterval(this.clockRunning, 100));
  }

  private clearInterval(): void {
    this.interval.forEach(function (item, index, object) {
      clearInterval(item);
      object.splice(index, 1);
    });
  }

  private async stop(): void {
    const timeStoppedMs = new Date().getTime();
    this.clearInterval();
    await matchRunnerStore.updateMatchState({
      timeBeganMs: this.state.timeBeganMs,
      timeStoppedMs,
      stoppedDurationMs: this.state.stoppedDurationMs,
      started: false,
      timeElapsedMs: this.timeElapsedMs,
    });
  }

  private async reset(): void {
    this.clearInterval();
    this.timer = new Date(matchRunnerStore.getTimerMs);
    this.timeElapsedMs = 0;
    await matchRunnerStore.updateMatchState({
      timeBeganMs: 0,
      timeStoppedMs: 0,
      stoppedDurationMs: 0,
      started: false,
      timeElapsedMs: 0,
    });
  }

  private clockRunning(): void {
    const currentTime: Date = new Date();
    this.timeElapsedMs =
      currentTime.getTime() -
      this.state.timeBeganMs -
      this.state.stoppedDurationMs;
    if (this.timer) {
      const d = new Date(this.timeElapsedMs);
      if (
        d.getUTCMinutes() >= this.timer.getUTCMinutes() &&
        d.getUTCSeconds() >= this.timer.getUTCSeconds()
      ) {
        this.timeElapsedMs = this.timer.getTime();
        this.stop();
      }
    }
  }

  private static zeroPrefix(num: number, digit: number): string {
    let zero = '';
    for (let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

  private incMin(): void {
    const mins = this.timer.getUTCMinutes();
    const secs = this.timer.getUTCSeconds();
    this.timer = new Date(0, 0, 0, 0, mins + 1, secs, 0);
    matchRunnerStore.setTimer(this.timer.getTime());
  }

  decMin() {
    const mins = this.timer.getUTCMinutes();
    const secs = this.timer.getUTCSeconds();
    this.timer = new Date(0, 0, 0, 0, mins - 1, secs, 0);
    matchRunnerStore.setTimer(this.timer.getTime());
  }

  incSec() {
    const mins = this.timer.getUTCMinutes();
    const secs = this.timer.getUTCSeconds();
    this.timer = new Date(0, 0, 0, 0, mins, secs + 1, 0);
    matchRunnerStore.setTimer(this.timer.getTime());
  }

  decSec() {
    const mins = this.timer.getUTCMinutes();
    const secs = this.timer.getUTCSeconds();
    this.timer = new Date(0, 0, 0, 0, mins, secs - 1, 0);
    matchRunnerStore.setTimer(this.timer.getTime());
  }


  public async created() {
    await matchRunnerStore.init(this.matchId);
    this.timeElapsedMs = this.state.timeElapsedMs;
    this.timer = new Date(matchRunnerStore.getTimerMs);
  }
}
</script>
<style scoped>
.clock {
  font-size: 12vh;
  font-weight: bold;
}
</style>
