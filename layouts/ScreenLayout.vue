<template>
  <v-app>
    <v-main>
      <Alert />
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Alert from '~/components/common/Alert.vue';

@Component({
  components: { Alert },
})
export default class ScreenLayout extends Vue {
}
</script>
