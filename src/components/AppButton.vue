<template>
  <div class="button">
    <button
      :class="{'button__title': true, 'button__title--with-hover': withHover, 'button__title--with-left-border-radius': withLeftBorderRadius}"
      type="button"
      @click="() => handleClick(title)"
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
  handleClick: (filter: string) => void;
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
    margin: px-to-rem(5);

    &__title {
      display: flex;
      padding: px-to-rem(5);
      font: $font-default-bold;
      color: $color-text-primary;
      cursor: pointer;
      background-color: $color-bg-btn;
      border: none;
      border-radius: 5px;
      transition: background-color 0.5s;

      &--with-left-border-radius {
        border-radius: 5px 0 0 5px;
      }

      &--with-hover {
        &:hover {
          color: $color-text-secondary;
          background-color: $color-bg-secondary;
          transition: background-color 0.7s;
        }
      }
    }

    &__close {
      display: flex;
      padding: px-to-rem(5);
      font: $font-default-bold;
      color: $color-text-secondary;
      cursor: pointer;
      background-color: $color-bg-secondary;
      border: none;
      border-radius: 0 5px 5px 0;
      transition: background-color 0.2s;

      &:hover {
        color: $color-text-secondary;
        background-color: $color-bg-accent;
        transition: background-color 0.5s;
      }
    }
  }
</style>
