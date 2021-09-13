<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col align="center">
        <Logo class="rotating" />
        <h1 class="text-h1">turnus</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style>
.rotating {
  animation: rotateZ 2s;
}
@keyframes rotateZ {
  to {
    transform: rotateZ(-360deg);
  }
}
</style>
