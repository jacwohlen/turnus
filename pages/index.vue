<template>
  <v-container fill-height fluid class="flex-column">
    <Logo />
    <h1 class="text-h1">turnus</h1>
    <v-divider class="my-6" />
    <template v-if="isAuthenticated" align="center">
      <p>Hi {{ user.email }}</p>
      <v-btn class="primary" to="/dashboard">Open Dashboard</v-btn>
    </template>
    <template v-else>
      <v-btn class="primary" to="/login">Start</v-btn>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userStore } from '~/store';

@Component
export default class Home extends Vue {
  private get isAuthenticated() {
    return userStore.isAuthenticated;
  }

  private get user() {
    return userStore.user;
  }
}
</script>
