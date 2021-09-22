<template>
  <div>
    <v-alert
      class="text-center"
      :value="!!alert['message']"
      dismissible
      outlined
      border="left"
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
