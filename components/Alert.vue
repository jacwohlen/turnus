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

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('alert', ['alert'])
  },

  methods: {
    ...mapMutations('alert', ['setAlert']),
    closeAlert(val) {
      this.setAlert({})
    }
  }
}
</script>
