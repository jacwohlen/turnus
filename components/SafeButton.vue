<template>
  <div>
    <v-icon v-show="!confirm" small @click="confirm = !confirm">
      mdi-delete
    </v-icon>
    <v-btn v-show="confirm" x-small color="primary" dark> Cancel </v-btn>
    <v-btn v-show="confirm" x-small color="error" dark @click="execute">
      Delete Weight
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    execute: {
      type: Function,
      default() {},
    },
  },
  data() {
    return {
      confirm: false,
    }
  },
}
</script>
