<template>
  <app-main-layout>
    <div class="page__wrapper">
      <div
        v-if="filters.length"
      >
        <app-container
          paddings-size="normal"
          with-border
          with-shadow
        >
          <app-filters
            :filters="filters"
            :handle-filters-clear="handleFiltersClear"
            :handle-remove="handleRemove"
          />
        </app-container>
      </div>
      <job-list
        :positions="filteredJobList"
        :handle-add-to-filter="handleAddToFilter"
      />
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppMainLayout from '../layouts/AppMainLayout.vue';
import AppFilters from '../components/AppFilters.vue';
import JobList from '../components/JobList.vue';
import AppContainer from '../components/AppContainer.vue';
import data from '../../data.json';

const positions = data

const filters = ref([])

const handleAddToFilter = (jobFilter: string) => {
  if (filters.value.includes(jobFilter)) {
    filters.value.filter((btn) => btn !== jobFilter);
  } else {
    filters.value.push(jobFilter);
  }
}

const filteredJobList = computed(() =>
  positions.filter(position => {
    const positionFilters = [].concat(position.role, position.level, ...position.languages, ...position.tools);

    return  filters.value.every(filter => positionFilters.includes(filter));
  })
)

const handleRemove = (filter: string) => {
  filters.value = filters.value.filter((btn) => btn !== filter);
}

const handleFiltersClear = () => filters.value = []
</script>

<style lang="scss" scoped>
.page__wrapper {
  display: flex;
  flex-direction: column;
  gap: px-to-rem(20);

  @include w-to($screen-tablet) {
    gap: px-to-rem(30);
  }
}
</style>
