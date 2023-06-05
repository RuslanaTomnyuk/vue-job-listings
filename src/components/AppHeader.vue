<template>
  <header class="header" />
</template>

<style lang="scss">
.header {
  height: calc(0.1 * 100vh);
  background-color: $color-bg-secondary;
  background-image: url("/images/bg-header-desktop.svg");
  background-repeat: no-repeat;
  background-size:  cover;

  @include w-to($screen-tablet) {
    height: calc(0.15 * 100vh);
    background-image: url("/images/bg-header-mobile.svg");
  }
}
</style>
