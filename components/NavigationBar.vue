<template>
  <v-app-bar>
    <v-btn v-for="(l, idx) in links" :key="idx" :to="l.link">
      {{ l.name }}
    </v-btn>
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
