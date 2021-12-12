<template>
  <div>
    <v-btn v-show="!confirm" v-bind="$attrs" @click="confirm = !confirm">
      <slot>Do</slot>
    </v-btn>
    <v-btn v-show="confirm" x-small dark @click="confirm = !confirm">
      Cancel
    </v-btn>
    <v-btn v-show="confirm" class="primary" x-small dark @click="execute">
      Confirm
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Emit, Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';

@Component
export default class extends Vue {
  confirm: boolean = false

  @Emit('confirmed')
  execute(): void {
  }
}
</script>
