<template>
  <button
    class="button"
    type="button"
  >
    {{ title }}
  </button>
</template>

<script setup lang="ts">
interface AppButtonProps {
  title: string;
  withText?: string;
}
defineProps<AppButtonProps>()

</script>
<style lang="scss" scoped>
  .button {
    position: relative;
    display: inline-block;
    width: auto;
    height: auto;
    padding: px-to-rem(5) px-to-rem(10);
    margin: px-to-rem(7) px-to-rem(5);
    font-size: $font-size;
    font-weight: 700;
    cursor: pointer;
    background-color: $color-bg-btn;
    border: none;
    border-radius: 5px;
    transition: background-color 0.2s;

    &:hover {
      color: $white;
      background-color: $greenish;
    }
  }
</style>
