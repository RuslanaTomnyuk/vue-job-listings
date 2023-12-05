<template>
  <div class="button">
    <button
      :class="{'button__title': true, 'button__title--with-hover': withHover, 'button__title--with-left-border-radius': withLeftBorderRadius}"
      type="button"
      @click.stop="() => handleClick(title)"
    >
      {{ title }}
    </button>
    <button
      v-if="withClose"
      class="button__close"
      @click="handleClick"
    >
      X
    </button>
  </div>
</template>

<script setup lang="ts">
interface AppButtonProps {
  title: string;
  withText?: string;
  withClose?: boolean;
  withHover?: boolean;
  withLeftBorderRadius: boolean;
  handleClick: (jobFilter: MouseEvent | string) => void;
}

withDefaults(defineProps<AppButtonProps>(), {
  withHover: true,
  withLeftBorderRadius: false
})

</script>
<style lang="scss" scoped>
  .button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: px-to-rem(5) px-to-rem(5);

    &__title {
      display: flex;
      align-items: center;
      justify-content: center;
      padding:  px-to-rem(5);
      font: $font-default-bold;
      color: $color-text-primary;
      cursor: pointer;
      background-color: $color-bg-btn;
      border: none;
      border-radius: px-to-rem(5);
      transition: background-color $transition-medium;

      &--with-left-border-radius {
        display: flex;
        align-items: center;
        border-radius: px-to-rem(5) 0 0 px-to-rem(5);
      }

      &--with-hover {
        &:hover {
          color: $color-text-secondary;
          background-color: $color-bg-secondary;
          transition: background-color $transition-slow;
        }
      }
    }

    &__close {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: px-to-rem(5);
      font: $font-default-bold;
      color: $color-text-secondary;
      cursor: pointer;
      background-color: $color-bg-secondary;
      border: none;
      border-radius: 0 px-to-rem(5) px-to-rem(5) 0;
      transition: background-color $transition-fast;

      &:hover {
        color: $color-text-secondary;
        background-color: $color-bg-accent;
        transition: background-color $transition-medium;
      }
    }
  }
</style>
