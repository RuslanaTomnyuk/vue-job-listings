<template>
  <app-main-layout>
    <div class="page__wrapper">
      <app-loader v-if="isLoading" />
      <div v-if="error">
        {{ error }}
      </div>
      <div
        v-if="filters.length"
      >
        <app-container
          paddings-size="normal"
          with-border
          with-shadow
        >
          <job-filters
            :filters="filters"
            :handle-filters-clear="handleFiltersClear"
            :handle-remove="handleRemove"
          />
        </app-container>
      </div>
      <job-card
        v-for="position in filteredJobList"
        :key="position.id"
        :position="position"
        :handle-add-to-filter="handleAddToFilter"
        @click="router.push(`/job-list/position/${position.id}`)"
      />
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppMainLayout from '../../layouts/AppMainLayout.vue';
import JobFilters from './JobFilters.vue';
import AppContainer from '../AppContainer.vue';
import JobCard from './JobCard.vue';

const filters = ref([])
import { useFetchJobs } from '../../composables/useFetchJobs.ts';
import AppLoader from '../AppLoader.vue';
import router from '../../router/router.ts';

const { data: positions, error, isLoading } = useFetchJobs()

const handleAddToFilter = (jobFilter: string) => {
  if (filters.value.includes(jobFilter)) {
    filters.value.filter((btn) => btn !== jobFilter);
  } else {
    filters.value.push(jobFilter);
  }
}

const filteredJobList = computed(() =>
  positions.value.filter(position => {
    const positionFilters = [].concat(position.role, position.level, ...position.languages, ...position.tools);

    return filters.value.every(filter => positionFilters.includes(filter));
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
