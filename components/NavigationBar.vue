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
      { name: 'Categories', link: '/categories' },
      { name: 'Competitors', link: '/competitors' },
    ],
  }),
}
</script>
