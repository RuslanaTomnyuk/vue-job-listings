<template>
  <app-header />
  <main
    class="page"
  >
    <div class="page__content">
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">

import AppHeader from '../components/AppHeader.vue';

</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: px-to-rem(30);
  max-width: 100%;
  max-height: 100%;
  padding: $main-page-padding;

  @include w-to($screen-tablet) {
    padding: $main-page-padding-mobile;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }
}
</style>
