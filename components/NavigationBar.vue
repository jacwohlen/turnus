<template>
  <v-app-bar app>
    <img src="~/assets/turnus-logo.svg" height="70%" alt="turnus logo">
    <h1 class="text-h5 ml-3 mr-3">turnus</h1>

    <v-tabs centered class="ml-n9" color="grey darken-1">
      <v-tab v-for="(l, idx) in links" :key="idx" :to="l.link">
        {{ l.name }}
      </v-tab>
    </v-tabs>

    <v-menu bottom min-width="200px" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            <h3 v-if="user">{{ user.email }}</h3>
            <v-divider class="my-3"></v-divider>
            <v-btn text @click="signOut">Logout</v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Home', link: '/' },
      { name: 'Registration', link: '/competitors' },
      { name: 'Categories', link: '/categories' },
      { name: 'Weigh In', link: '/weighin' },
      { name: 'Pools', link: '/pools' },
      { name: 'Schedule', link: '/schedule' },
      { name: 'Results', link: '/results' },
    ],
  }),
  computed: {
    user() {
      return this.$store.getters['users/user']
    },
  },
  methods: {
    signOut() {
      this.$store.dispatch('users/signOut').then(() => {
        this.$router.push('/')
      })
    },
  },
}
</script>
