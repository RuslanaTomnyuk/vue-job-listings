<template>
  <app-main-layout>
    <h2>Profile</h2>
    <div class="profile">
      <v-card
        min-width="200"
        height="200"
      >
        <img
          class="profile__photo"
          src="http://localhost:5173/public/images/find-job.jpg"
          alt="user-photo"
        >
      </v-card>
      <v-card>
        <v-tabs
          v-model="tab"
          bg-color="teal-lighten-3"
          color="white"
        >
          <v-tab
            v-for="item in items"
            :key="item"
            :value="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item
            v-for="item in items"
            :key="item"
            :value="item"
          >
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-card>
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import AppMainLayout from '@/layouts/AppMainLayout.vue';

const items = computed(() => [
  'Edit Profile', 'Change Password',
])
const text = 'Edit Profile';
const tab = ref(null)
</script>
<style lang="scss">
.profile {
  display: flex;
  flex-direction: row;
  gap: px-to-rem(10);

  &__photo {
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

