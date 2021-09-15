<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col align="center">
        <Logo />
        <h1 class="text-h1">turnus</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="!isAuthenticated" align="center">
        <Login />
      </v-col>
      <v-col v-else align="center">
        <v-card class="elevation-12" width="50%">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Welcome back, {{ user.email }}!</v-toolbar-title>
          </v-toolbar>
          <v-card-actions>
            <v-btn color="secondary" @click="signOut">Log out</v-btn>
            <v-btn color="primary" to="/competitors">Launch Dashboard</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'LandingPage',
  computed: {
    isAuthenticated() {
      return this.$store.getters['users/isAuthenticated']
    },
    user() {
      return this.$store.getters['users/user']
    },
  },
  methods: {
    signOut() {
      this.$store.dispatch('users/signOut')
    },
  },
}
</script>
