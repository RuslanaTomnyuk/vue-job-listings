<template>
  <app-header />
  <app-main-layout>
    <filters />
    <job-list />
  </app-main-layout>
</template>
<script setup lang="ts">
import AppMainLayout from '../layouts/AppMainLayout.vue';
import AppHeader from '../components/AppHeader.vue';
import JobList from '../components/JobList.vue';
import Filters from '../components/Filters.vue';

</script>
