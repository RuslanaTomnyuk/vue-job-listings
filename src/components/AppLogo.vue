<template>
  <img
    v-if="logo"
    class="logo"
    :src="logoUrl"
    :alt="placeholder"
    @error="onError"
  >
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface AppLogoProps {
  logo?: string;
  placeholder: string;
}
const props = defineProps<AppLogoProps>()

const logoUrl = ref(props?.logo);

const onError = () => {
  logoUrl.value = '/public/icon/image-placeholder.png';
};
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: px-to-rem(60);
  height: px-to-rem(60);
  padding: px-to-rem(10);
  border-radius: 50%;
  object-fit: cover;

  @include w-to($screen-tablet) {
    width: px-to-rem(50);
    height: px-to-rem(50);
    padding: px-to-rem(5);
  }
}
</style>
