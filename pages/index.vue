<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col align="center">
        <Logo />
        <h1 class="text-h1">turnus</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="isAuthenticated" align="center">
        <p>Hi {{ user.email }}</p>
        <v-btn class="primary" to="/dashboard">Open Dashboard</v-btn>
      </v-col>
      <v-col v-else align="center">
        <v-btn class="primary" to="/login">Start</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { userStore } from '~/store'

export default {
  computed: {
    isAuthenticated() {
      return userStore.isAuthenticated
    },
    user() {
      return userStore.user
    },
  },
}
</script>
