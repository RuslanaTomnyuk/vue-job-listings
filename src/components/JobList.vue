<template>
  <job-card
    v-for="position in positions"
    :key="position.id"
    :position="position"
  />
</template>

<script setup lang="ts">
import data from '../../data.json'

import JobCard from './JobCard.vue';
const positions = data
</script>
