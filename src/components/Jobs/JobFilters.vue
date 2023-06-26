<template>
  <div class="filters">
    <div
      v-for="filter in filters"
      :key="filter"
    >
      <app-button
        v-if="filter"
        :key="filter"
        with-close
        :with-hover="withHover"
        :with-left-border-radius="withLeftBorderRadius"
        :title="filter"
        :handle-click="() => handleRemove(filter)"
      />
    </div>
  </div>
  <div class="filters__clear">
    <button
      v-if="filters.length"
      class="filters__clear-button"
      title="Clear"
      @click="handleFiltersClear"
    >
      Clear
    </button>
  </div>
</template>

<script setup lang="ts">
import AppButton from '../AppButton.vue';

interface FiltersProps {
  filters: string[];
  handleFiltersClear: () => void;
  handleRemove: (filter: string) => void;
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
        font: $font-default-bold;
        color: $dark-grayish-cyan;
        text-decoration: underline;
        cursor: pointer;
        background-color: $color-bg-block;
        border: none;
      }
    }
  }
</style>
