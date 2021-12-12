<template>
  <div
    class="wrapper"
    :style="{
      top: top + 'px',
    }"
  >
    <v-alert
      class="mt-3"
      :value="!!alert['message']"
      :type="alert.type"
      dismissible
      border="left"
      elevation="5"
      @input="closeAlert"
    >
      {{ alert['message'] }}
    </v-alert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { alertStore } from '~/store';
import { AlertMessage } from '~/store/alert';

@Component
export default class Alert extends Vue {
  private get alert(): AlertMessage {
    return alertStore.alert;
  }

  private closeAlert(): void {
    alertStore.setError({ msg: '' });
  }

  public get top(): number {
    return this.$vuetify.application.top;
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  display: inline-grid;
  justify-content: center;
  width: 100%;
  z-index: 9999;
}
</style>
