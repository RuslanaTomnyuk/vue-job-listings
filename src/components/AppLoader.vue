<template>
  <div>
    <v-progress-linear
      indeterminate
      color="#80CBC4"
    />
  </div>
</template>

<!--<template>-->
<!--  <div :class="{'loader': true, 'loader&#45;&#45;fixed': isFixed}">-->
<!--    <loader-icon-->
<!--      :style="{width: size, height: size}"-->
<!--      class="loader__image"-->
<!--      title="Loader"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->


<!--<script setup lang="ts">-->
<!--import { Loader as LoaderIcon } from '../assets/icons/loader.svg'-->

<!--interface AppLoaderProps {-->
<!--  withOverlap?: boolean-->
<!--  size?: string;-->
<!--  isFixed?: boolean;-->
<!--}-->

<!--withDefaults(defineProps<AppLoaderProps>(), {-->
<!--  withOverlap: true-->
<!--})-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.loader {-->
<!--  position: absolute;-->
<!--  inset: 0;-->
<!--  z-index: 100;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->

<!--  &&#45;&#45;fixed {-->
<!--    position: fixed;-->
<!--  }-->

<!--  &__image {-->
<!--    z-index: 3;-->
<!--    width: px-to-rem(40);-->
<!--    height: px-to-rem(40);-->
<!--    animation: spin 3s linear infinite;-->
<!--  }-->
<!--}-->
<!--</style>-->

<!--<template>-->
<!--  <v-skeleton-loader-->
<!--    class="mx-auto border"-->
<!--    max-width="300"-->
<!--    color="primary"-->
<!--    type="list-item-avatar, actions"-->
<!--  />-->
<!--</template>-->
