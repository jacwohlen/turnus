<template>
  <div>
    <v-row no-gutters align="center">
      <v-spacer></v-spacer>
      <v-col>
        <v-btn @click="incMin"> + Min </v-btn>
        <v-btn @click="decMin"> - Min </v-btn>
      </v-col>
      <v-col class="clock">
        {{ time }}
      </v-col>
      <v-col>
        <v-btn @click="incSec"> + Sec </v-btn>
        <v-btn @click="decSec"> - Sec </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row no-gutters>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn v-if="!state.started" @click="start"> Start </v-btn>
        <v-btn v-else @click="stop"> Stop </v-btn>
      </v-col>
      <v-col>
        <v-btn @click="reset"> Reset </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

import { matchRunnerStore } from '~/store'

@Component
export default class About extends Vue {
  @Prop({ type: String, required: true })
  matchId!: string

  @Prop(Boolean)
  useTimer!: boolean | undefined

  timeElapsedMs: number = 0
  interval: NodeJS.Timeout[] = []
  timer: Date = new Date(0)

  get state() {
    return matchRunnerStore.matchState
  }

  async created() {
    await matchRunnerStore.init(this.matchId)
    this.timeElapsedMs = this.state.timeElapsedMs
    this.timer = new Date(matchRunnerStore.getTimerMs)
  }

  get time() {
    let t = new Date(this.timeElapsedMs)
    if (this.useTimer) {
      t = new Date(this.timer.getTime() - this.timeElapsedMs)
    }
    const min = t.getUTCMinutes()
    const sec = t.getUTCSeconds()
    return min + ':' + this.zeroPrefix(sec, 2)
  }

  @Watch('state.started')
  async onStartStop(value: boolean) {
    this.timeElapsedMs = this.state.timeElapsedMs
    if (value) this.interval.push(setInterval(this.clockRunning, 100))
    else this.clearInterval()
  }

  get timerMs() {
    return matchRunnerStore.getTimerMs
  }

  @Watch('timerMs')
  async syncTimerValue(value: number) {
    this.timer = new Date(value)
  }

  async start() {
    let timeBeganMs = this.state.timeBeganMs
    let stoppedDurationMs = 0
    if (this.state.started && this.interval.length > 0) return

    if (this.state.timeBeganMs === 0) {
      this.reset()
      timeBeganMs = new Date().getTime()
    }

    if (this.state.timeStoppedMs !== 0) {
      stoppedDurationMs =
        this.state.stoppedDurationMs +
        new Date().getTime() -
        this.state.timeStoppedMs
    }
    await matchRunnerStore.updateMatchState({
      timeBeganMs: timeBeganMs,
      timeStoppedMs: this.state.timeStoppedMs,
      stoppedDurationMs: stoppedDurationMs,
      started: true,
      timeElapsedMs: 0,
    })
    this.interval.push(setInterval(this.clockRunning, 100))
  }

  clearInterval() {
    this.interval.forEach(function (item, index, object) {
      clearInterval(item)
      object.splice(index, 1)
    })
  }

  async stop() {
    const timeStoppedMs = new Date().getTime()
    this.clearInterval()
    await matchRunnerStore.updateMatchState({
      timeBeganMs: this.state.timeBeganMs,
      timeStoppedMs: timeStoppedMs,
      stoppedDurationMs: this.state.stoppedDurationMs,
      started: false,
      timeElapsedMs: this.timeElapsedMs,
    })
  }

  async reset() {
    this.clearInterval()
    this.timer = new Date(matchRunnerStore.getTimerMs)
    this.timeElapsedMs = 0
    await matchRunnerStore.updateMatchState({
      timeBeganMs: 0,
      timeStoppedMs: 0,
      stoppedDurationMs: 0,
      started: false,
      timeElapsedMs: 0,
    })
  }

  clockRunning() {
    let currentTime: Date = new Date()
    this.timeElapsedMs =
      currentTime.getTime() -
      this.state.timeBeganMs -
      this.state.stoppedDurationMs
    if (this.timer) {
      const d = new Date(this.timeElapsedMs)
      if (
        d.getUTCMinutes() >= this.timer.getUTCMinutes() &&
        d.getUTCSeconds() >= this.timer.getUTCSeconds()
      ) {
        this.timeElapsedMs = this.timer.getTime()
        this.stop()
      }
    }
  }

  zeroPrefix(num: number, digit: number) {
    var zero = ''
    for (var i = 0; i < digit; i++) {
      zero += '0'
    }
    return (zero + num).slice(-digit)
  }

  incMin() {
    const mins = this.timer.getUTCMinutes()
    const secs = this.timer.getUTCSeconds()
    this.timer = new Date(0, 0, 0, 0, mins + 1, secs, 0)
    matchRunnerStore.setTimer(this.timer.getTime())
  }
  decMin() {
    const mins = this.timer.getUTCMinutes()
    const secs = this.timer.getUTCSeconds()
    this.timer = new Date(0, 0, 0, 0, mins - 1, secs, 0)
    matchRunnerStore.setTimer(this.timer.getTime())
  }
  incSec() {
    const mins = this.timer.getUTCMinutes()
    const secs = this.timer.getUTCSeconds()
    this.timer = new Date(0, 0, 0, 0, mins, secs + 1, 0)
    matchRunnerStore.setTimer(this.timer.getTime())
  }
  decSec() {
    const mins = this.timer.getUTCMinutes()
    const secs = this.timer.getUTCSeconds()
    this.timer = new Date(0, 0, 0, 0, mins, secs - 1, 0)
    matchRunnerStore.setTimer(this.timer.getTime())
  }
}
</script>
<style scoped>
.clock {
  font-size: 12vh;
  font-weight: bold;
}
</style>
