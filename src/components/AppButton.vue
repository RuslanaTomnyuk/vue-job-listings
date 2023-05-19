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
  handleClick: (title: string) => void;
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
      font-size: $font-size;
      font-weight: 700;
      color: $greenish;
      cursor: pointer;
      background-color: $color-bg-btn;
      border: none;
      border-radius: 5px;
      transition: background-color 0.2s;

      &--with-left-border-radius {
        border-radius: 5px 0 0 5px;
      }

      &--with-hover {
        &:hover {
          color: $white;
          background-color: $greenish;
        }
      }
    }

      &__close {
        display: flex;
        padding: px-to-rem(5);
        font-size: $font-size;
        font-weight: 700;
        color: $white;
        cursor: pointer;
        background-color: $greenish;
        border: none;
        border-radius: 0 5px 5px 0;
        transition: background-color 0.2s;

        &:hover {
          color: $white;
          background-color: $black;

        }
      }
  }
</style>
