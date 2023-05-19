<template>
  <app-header />
  <app-main-layout>
    <div
      v-if="clickedButtons.length"
    >
      <app-container
        paddings-size="normal"
        with-border
        with-shadow
      >
        <filters
          :clicked-buttons="clickedButtons"
          :handle-button-clear="handleButtonClear"
          :handle-remove="handleRemove"
        />
      </app-container>
    </div>
    <job-list
      :positions="filteredJobList"
      :handle-button-click="handleButtonClick"
    />
  </app-main-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppMainLayout from '../layouts/AppMainLayout.vue';
import AppHeader from '../components/AppHeader.vue';
import Filters from '../components/Filters.vue';
import JobList from '../components/JobList.vue';
import AppContainer from '../components/AppContainer.vue';
import data from '../../data.json';

const positions = data

const clickedButtons = ref([])

const handleButtonClick = (buttonTitle: string) => {
  if (clickedButtons.value.includes(buttonTitle)) {
    clickedButtons.value = clickedButtons.value.filter((btn) => btn !== buttonTitle);
  }
  clickedButtons.value.push(buttonTitle);
}

const filteredJobList = computed(() =>
  positions.filter(position => {
    const positionFilters = [].concat(position.role, position.level, ...position.languages, ...position.tools);

    return  clickedButtons.value.every(filter => positionFilters.includes(filter));
  })
)

const handleRemove = (title: string) => {
  clickedButtons.value = clickedButtons.value.filter((btn) => btn !== title);
}

const handleButtonClear = () => clickedButtons.value.splice(0)
</script>
