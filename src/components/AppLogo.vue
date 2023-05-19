<template>
  <img
    v-if="logo"
    class="logo"
    :src="logo"
    alt="Logo"
  >
</template>

<script lang="ts" setup>
interface AppLogoProps {
  logo?: string;
}

defineProps<AppLogoProps>()
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: px-to-rem(50);
  height: px-to-rem(50);
  padding: px-to-rem(10);
  border-radius: 50%;
  object-fit: cover;

  @include w-to($screen-tablet) {
    width: px-to-rem(40);
    height: px-to-rem(40);
  }
}
</style>
