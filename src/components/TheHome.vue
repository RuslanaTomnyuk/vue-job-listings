<template>
  <app-main-layout>
    <div>
      <h1>Main Page</h1>
      <p>Welcome to the main page!</p>
      <router-link :to="{path: 'testNotFoundPage'}">
        Test Not Found Page
      </router-link>
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import AppMainLayout from '../layouts/AppMainLayout.vue';
</script>
