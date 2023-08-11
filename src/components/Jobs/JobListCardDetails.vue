<template>
  <app-main-layout v-if="jobPositionById">
    <h1>
      {{ jobPositionById.position }}
    </h1>
    <job-list-card
      :position="jobPositionById"
    />
    <div class="buttons">
      <app-button
        :title="$t('jobListCardDetails.back')"
        :handle-click="() => router.back()"
      />
      <app-button
        :title="$t('jobListCardDetails.home')"
        :handle-click="() => router.push({ name: 'home' })"
      />
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppMainLayout from '@/layouts/AppMainLayout.vue';
import AppButton from '@/components/AppButton.vue';
import JobListCard from '@/components/Jobs/JobListCard.vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/composables/useStore.ts';

import router from '@/router/router';

const store = useStore()
const route = useRoute();
const jobId = +route.params.id;

const jobPositionById = computed<JobPosition>(() => store.getters.getJobPositionById(jobId))

store.dispatch('fetchJobList')
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  flex-direction: row;
  gap: px-to-rem(7);
  align-items: center;
  justify-content: center;
  padding: px-to-rem(20);
}
</style>
