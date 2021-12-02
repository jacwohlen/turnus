<template>
  <v-text-field
    :value="value"
    @input="$emit('input', $event)"
    append-icon="mdi-magnify"
    hide-details
    label="Search"
    single-line
  />
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class SearchInput extends Vue {
  @Prop({required: true})
  public value!: string | null;
}
</script>
<style lang="scss" scoped>

</style>
