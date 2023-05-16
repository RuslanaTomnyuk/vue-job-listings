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
  background-color: $color-bg-page;

  &--bigPaddings {
    padding:  px-to-rem(20);

    // @include w-to($screen-desktop-small) {
    //  padding: px-to-rem(20);
    // }
  }

  &--normalPaddings {
    padding: px-to-rem(20);
  }

  &--smallPaddings {
    padding: px-to-rem(15);
  }

  &--rounded {
    border-radius: px-to-rem(10);
  }

  &--shadowed {
    box-shadow: 0 0 20px rgb(16 24 40 / 10%);
    transition: all 0.15s;
  }

  &--clickable {
    cursor: pointer;
    user-select: none;
  }
}
</style>
