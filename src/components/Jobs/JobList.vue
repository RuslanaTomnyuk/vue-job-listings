<template>
  <app-main-layout>
    <h3 v-if="!isAuthorized">
      {{ 'You are not authorized' }}
    </h3>
    <div
      v-if="isAuthorized"
      class="page__wrapper"
    >
      <app-loader v-if="isLoading" />
      <h1
        v-if="!filteredJobList.length && error"
      >
        {{ error.message || error }}
      </h1>
      <app-container
        v-if="filteredJobList.length"
        paddings-size="normal"
        with-border
        with-shadow
      >
        <job-list-input
          v-model="searchText"
        />
      </app-container>
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
        v-for="position in filteredCards"
        :key="position.id"
        :position="position"
        :handle-add-to-filter="handleAddToFilter"
        @click="router.push(`/job-list/${position.id}`)"
      />
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import router from '@/router/router.ts';

import AppMainLayout from '@/layouts/AppMainLayout.vue';
import JobListFilters from '@/components/Jobs/JobListFilters.vue';
import JobListCard from '@/components/Jobs/JobListCard.vue';
import AppContainer from '../AppContainer.vue';
import AppLoader from '../AppLoader.vue';
import { useStore } from '@/composables/useStore.ts';
import { useDebounce } from '@/composables/useDebounce';
import JobListInput from '@/components/Jobs/JobListInput.vue';
import axiosClient from '@/configs/axios/axiosClient';

const store = useStore()
const jobs = computed(() => store.state.jobs)
const filters = computed<string[]>(() => jobs.value.filters)
const error = computed(() => jobs.value.error)

const message = ref('You are not logged in');
const isAuthorized = ref(false);
const isLoading = computed(() => jobs.value.isLoading)

const searchInput = ref('');
const searchText = useDebounce(searchInput);

const filteredByInputSearch = computed(() => {
  return searchText.value.length > 1
    ? jobs.value.jobs.filter(job =>
      job.position.concat(
        job.role,
        job.level,
        ...job.languages,
        ...job.tools
      ).toLowerCase().includes(searchText.value.trim().toLowerCase())
    )
    : jobs.value.jobs
});

const handleAddToFilter = (jobFilter: string) => {
  if (!filters.value.includes(jobFilter)) {
    store.dispatch('addToFilters', jobFilter)
  }
};

const filteredJobList = computed(() => store.getters.filteredJobList);


const filteredCards = computed(() => searchText.value.length ? filteredByInputSearch.value : filteredJobList.value);

onMounted(async () => {
  try {
    const { data } = await axiosClient.get('/user', { withCredentials: true });

    if (data.id && data.email) {
      isAuthorized.value = true;
      message.value = data.username

      await store.dispatch('setAuth', isAuthorized.value)
      store.dispatch('fetchJobList');
    }
  } catch (error) {
    isAuthorized.value = false;
    await store.dispatch('setAuth', !isAuthorized.value)
  }
})

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
