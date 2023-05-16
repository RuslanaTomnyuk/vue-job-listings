<template>
  <div
    v-for="(filter, index) in filteredData"
    :key="index"
    class="buttons"
  >
    <app-button
      v-if="filter"
      :key="position.id"
      class="button"
      :title="filter"
    />
  </div>
</template>

<script setup lang="ts">
import AppButton from './AppButton.vue';

interface FiltersProps {
  position: JobPosition;
  buttonTitles: string[];
  filteredData: string[]
}
defineProps<FiltersProps>()

</script>
