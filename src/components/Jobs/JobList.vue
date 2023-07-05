<template>
  <app-main-layout>
    <div class="page__wrapper">
      <app-loader v-if="isLoading" />
      <h1
        v-if="error"
      >
        {{ error.message || error }}
      </h1>
      <div
        v-if="filters.length"
      >
        <app-container
          paddings-size="normal"
          with-border
          with-shadow
        >
          <job-list-filters
            :filters="filters"
          />
        </app-container>
      </div>
      <job-list-card
        v-for="position in filteredJobList"
        :key="position.id"
        :position="position"
        :handle-add-to-filter="handleAddToFilter"
        @click="router.push(`/job-list/${position.id}`)"
      />
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import router from '@/router/router.ts';

import AppMainLayout from '@/layouts/AppMainLayout.vue';
import JobListFilters from '@/components/Jobs/JobListFilters.vue';
import JobListCard from '@/components/Jobs/JobListCard.vue';
import AppContainer from '../AppContainer.vue';
import AppLoader from '../AppLoader.vue';
import { useStore } from '@/composables/useStore.ts';

const store = useStore()
const jobs = computed(() => store.state.jobs)
const filters = computed<string[]>(() => jobs.value.filters)
const error = computed(() => jobs.value.error)
const isLoading = computed(() => jobs.value.isLoading)

const handleAddToFilter = (jobFilter: string) => {
  if (!filters.value.includes(jobFilter)) {
    store.dispatch('addToFilters', jobFilter)
  }
}

const filteredJobList = computed(() => store.getters.filteredJobList)
store.dispatch('fetchJobList')
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
