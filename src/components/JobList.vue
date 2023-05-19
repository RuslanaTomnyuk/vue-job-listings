<template>
  <job-card
    v-for="position in positions"
    :key="position.id"
    :position="position"
    :handle-button-click="handleButtonClick"
  />
</template>

<script setup lang="ts">
import JobCard from './JobCard.vue';
interface JobListProps {
  positions: JobPosition[];
  handleButtonClick: (clickedButton: string) => void;
}

defineProps<JobListProps>()
</script>
