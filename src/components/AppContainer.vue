<template>
  <div
    :class="`
    container
    container--${paddingsSize}Paddings
    ${withBorder ? 'container--bordered' : ''}
    ${isBorderRounded ? 'container--rounded' : ''}
    ${withShadow ? 'container--shadowed' : ''}
  `"
    :style="{backgroundColor: bgColor}"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">

interface AppContainerProps {
  paddingsSize?: 'small' | 'normal' | 'big' | 'no';
  withBorder?: boolean;
  isBorderRounded?: boolean;
  withShadow?: boolean;
  bgColor?: string;
  isButton?: boolean;
}

withDefaults(defineProps<AppContainerProps>(), {
  paddingsSize: 'big',
  isScrollable: true,
  titleSize: 'normal',
  isBorderRounded: true
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: px-to-rem(20);
  background-color: $color-bg-block;

  &--bigPaddings {
    padding:  px-to-rem(20);

    @include w-to($screen-tablet) {
      padding: px-to-rem(10);
    }
  }

  &--normalPaddings {
    padding: px-to-rem(20);
  }

  &--rounded {
    border-radius: px-to-rem(5);
  }

  &--shadowed {
    box-shadow: 0 5px 15px rgba(0 0 0 / 0.35);
  }
}
</style>
