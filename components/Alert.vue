<template>
  <div>
    <v-alert
      class="text-center"
      :value="!!alert['message']"
      :type="alert.type"
      absolute
      dismissible
      border="left"
      elevation="5"
      @input="closeAlert"
      >{{ alert['message'] }}</v-alert
    >
  </div>
</template>

<script lang="ts">
import { alertStore } from '~/store'

export default {
  computed: {
    alert() {
      if (alertStore === undefined) {
        console.log('Error: alertStore must not be undefined')
      }
      return alertStore.alert
    },
  },

  methods: {
    closeAlert() {
      alertStore.setError({ msg: '' })
    },
  },
}
</script>
<style scoped>
.v-alert {
  position: fixed;
  left: 50%;
  top: 120px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  z-index: 9999;
}
</style>
