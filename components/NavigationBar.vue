<template>
  <v-app-bar app>
    <img src="~/assets/turnus-logo.svg" height="70%" alt="turnus logo">
    <h1 class="text-h5 ml-3 mr-3">turnus</h1>

    <v-tabs centered class="ml-n9" color="grey darken-1">
      <v-tab v-for="(l, idx) in links" :key="idx" :to="l.link">
        {{ l.name }}
      </v-tab>
    </v-tabs>

    <v-avatar>
      <v-icon>mdi-account-circle</v-icon>
    </v-avatar>
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
}
</script>
