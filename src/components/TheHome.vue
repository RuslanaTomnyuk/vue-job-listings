<template>
  <app-main-layout>
    <div class="home">
      <h1>{{ $t("pages.mainPage") }}</h1>
      <p>{{ $t("pages.welcome") }}</p>
    </div>
    <div class="home__image">
      <img
        class="image"
        :src="homeImage"
        alt="home_picture"
      >
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import AppMainLayout from '../layouts/AppMainLayout.vue';
const homeImage = './public/images/find-job.jpg';
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__image {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}

  .image {
    max-height: 60vh;
    object-fit: contain;
    overflow: hidden;
  }
</style>
