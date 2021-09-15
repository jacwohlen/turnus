<template>
  <v-app>
    <NavigationBar />
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>
