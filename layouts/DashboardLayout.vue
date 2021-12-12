<template>
  <v-app class="background">
    <NavigationBar />
    <v-main class="blue lighten-3">
      <Alert />
      <v-container class="content">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationBar from '~/components/NavigationBar.vue';
import Alert from '~/components/Alert.vue';

@Component({
  components: { Alert, NavigationBar },
})
export default class DashboardLayout extends Vue {

}
</script>

<style lang="scss" scoped>
.content {
  max-width: 1200px;
  min-width: calc(min(100%, 1200px));
  margin: 0 auto;
  background-color: white;
  min-height: 100%;
}
</style>
