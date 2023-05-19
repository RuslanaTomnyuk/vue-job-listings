<template>
  <div class="filters">
    <div
      v-for="(clickedButton, index) in clickedButtons"
      :key="index"
    >
      <app-button
        v-if="clickedButton"
        :key="index"
        with-close
        :with-hover="withHover"
        :with-left-border-radius="withLeftBorderRadius"
        class="filters__buttons"
        :title="clickedButton"
        @click="handleRemove(clickedButton)"
      />
    </div>
  </div>
  <div class="filters__clear">
    <button
      v-if="clickedButtons.length"
      class="filters__clear-button"
      title="Clear"
      @click="handleButtonClear"
    >
      Clear
    </button>
  </div>
</template>

<script setup lang="ts">
import AppButton from './AppButton.vue';

interface FiltersProps {
  clickedButtons: string[];
  handleButtonClear: () => void;
  handleRemove: (clickedButton: string) => void;
  withClose: boolean;
  withHover: boolean;
  withLeftBorderRadius: boolean;
}

withDefaults(defineProps<FiltersProps>(), {
  withLeftBorderRadius: true
})

</script>

<style lang="scss" scoped>
  .filters {
    display: flex;
    flex: auto;
    flex-flow: row wrap;

    &__clear {
      display: flex;
      align-items: center;
      justify-content: center;

      &-button {
        font-family: $font-family;
        font-size: $font-size;
        font-weight: 700;
        color: $dark-grayish-cyan;
        text-decoration: underline;
        cursor: pointer;
        background-color: $color-bg-page;
        border: none;
      }
    }
  }
</style>
