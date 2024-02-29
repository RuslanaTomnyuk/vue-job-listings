<template>
  <div class="filters">
    <div
      v-for="jobFilter in filters"
      :key="jobFilter"
    >
      <app-button
        v-if="jobFilter"
        :key="jobFilter"
        with-close
        :with-hover="withHover"
        with-job-actions
        :with-left-border-radius="withLeftBorderRadius"
        :title="jobFilter"
        :handle-click="() => handleRemove(jobFilter)"
      />
    </div>
  </div>
  <div class="filters__clear">
    <button
      v-if="filters.length"
      class="filters__clear-button"
      title="Clear"
      @click="handleClearFilters"
    >
      Clear
    </button>
  </div>
</template>

<script setup lang="ts">
import AppButton from '../AppButton.vue';
import { useStore } from '@/composables/useStore.ts';

const store = useStore()

interface FiltersProps {
  filters: string[];
  withClose?: boolean;
  withHover?: boolean;
  withLeftBorderRadius: boolean;
}

const props = withDefaults(defineProps<FiltersProps>(), {
  withLeftBorderRadius: true
})

const handleRemove = (jobFilter: string) => {
  if (props.filters.includes(jobFilter)) {
    store.dispatch('removeFromFilters', jobFilter)
  }
}

const handleClearFilters = () => {
  if (props.filters) {
    store.dispatch('clearFilters')
  }
}
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
    }

    &__clear-button {
      font: $font-default-bold;
      color: $dark-grayish-cyan;
      text-decoration: underline;
      cursor: pointer;
      background-color: $color-bg-block;
      border: none;
    }
  }
</style>
