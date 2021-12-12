<template>
  <img class="rotating" src="~/assets/turnus-logo.svg" alt="turnus logo">
</template>

<style lang="scss" scoped>
.rotating {
  animation: rotateZ 2s;
}

@keyframes rotateZ {
  to {
    transform: rotateZ(-360deg);
  }
}
</style>
