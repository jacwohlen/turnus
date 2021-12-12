<template>
  <h1>{{ title }}</h1>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PageTitle extends Vue {
  @Prop({ type: String, required: true })
  public title!: string;
}
</script>
<style lang="scss" scoped>

</style>
