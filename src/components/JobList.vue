<template>
  <job-card
    v-for="position in positions"
    :key="position.id"
    :position="position"
    :handle-add-to-filter="handleAddToFilter"
  />
</template>

<script setup lang="ts">
import JobCard from './JobCard.vue';
interface JobListProps {
  positions: JobPosition[];
  handleAddToFilter: (filter: string) => void;
}

defineProps<JobListProps>()
</script>
