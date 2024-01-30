<template>
  <app-main-layout>
    <h3 v-if="!auth">
      <app-loader v-if="isLoading" />
      {{ 'You are not authorized' }}
    </h3>
    <div
      v-if="auth"
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
import AppContainer from '../AppContainer.vue';
import AppLoader from '../AppLoader.vue';
import JobListFilters from '@/components/Jobs/JobListFilters.vue';
import JobListCard from '@/components/Jobs/JobListCard.vue';
import JobListInput from '@/components/Jobs/JobListInput.vue';
import { useStore } from '@/composables/useStore.ts';
import { useDebounce } from '@/composables/useDebounce';
import getUser from '@/services/getUser';

const store = useStore()
const jobs = computed(() => store.state.jobs)
const filters = computed<string[]>(() => jobs.value.filters)
const error = computed(() => jobs.value.error)

const message = ref('You are not logged in');
const isAuthorized = ref(false);

const auth = computed(() => store.state.auth.authenticated);

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
    const response = await getUser();

    if (response) {
      if (response?.data?.id && response?.data?.email) {
        isAuthorized.value = true;
        message.value = response.data.username

        await store.dispatch('setAuth', isAuthorized.value)
        await store.dispatch('fetchJobList');
      }
    }
  } catch (error) {
    console.log('error', error);
    isAuthorized.value = false;
    await store.dispatch('setAuth', isAuthorized.value)
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
