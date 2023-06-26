<template>
  <div class="not-found">
    <div
      class="not-found__container"
    >
      <div class="not-found__content">
        <h2>
          The requested URL was not found
        </h2>
        <app-button
          title="< Back"
          :handle-click="() => router.back()"
        />
        <app-button
          title="Home"
          :handle-click="() => router.push({name: 'home'})"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import router from '../router/router.ts';
import AppButton from './AppButton.vue';

</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  gap: px-to-rem(15);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    gap: px-to-rem(15);
    align-items: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: px-to-rem(5);
    align-items: center;
    max-width: px-to-rem(450);
    text-align: center;
  }
}
</style>
