<template>
  <v-app-bar app>
    <v-btn text plain to="/">
      <v-avatar tile>
        <img src="~/assets/turnus-logo.svg" height="70%" alt="turnus logo" />
      </v-avatar>
      <h1 class="text-h5 ml-3 mr-3">turnus</h1>
    </v-btn>

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
import { userStore } from '~/store'

export default {
  data: () => ({
    links: [
      { name: 'Home', link: '/dashboard' },
      { name: 'Fighters', link: '/dashboard/competitors' },
      { name: 'Categories', link: '/dashboard/categories' },
      { name: 'Weigh In', link: '/dashboard/weighin' },
      { name: 'Pools', link: '/dashboard/pools' },
      { name: 'Schedule', link: '/dashboard/schedule' },
      { name: 'Results', link: '/dashboard/results' },
    ],
  }),
  computed: {
    user() {
      if (userStore === undefined) {
        console.log('Error: userStore must not be undefined')
      }
      return userStore.user
    },
  },
  methods: {
    signOut() {
      userStore.signOut().then(() => {
        this.$router.push('/')
      })
    },
  },
}
</script>
