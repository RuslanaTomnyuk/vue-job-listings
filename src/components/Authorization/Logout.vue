<template>
  <app-main-layout>
    <div class="wrapper">
      <v-card
        width="360"
        max-width="600"
      >
        <v-toolbar
          dark
          color="teal-lighten-3"
        >
          <v-toolbar-title>
            <app-button
              :with-hover="withHover"
              title="Log out"
              :handle-click="logout"
            />
          </v-toolbar-title>
        </v-toolbar>
      </v-card>
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import AppMainLayout from '@/layouts/AppMainLayout.vue';
import AppButton from '../AppButton.vue';
import axiosClient from '@/configs/axios/axiosClient';
import router from '@/router/router';

interface LogoutProps {
  withHover?: boolean;
}

defineProps<LogoutProps>()

const logout = async() => {
  try {
    await axiosClient.get('/auth/logout', { withCredentials: true });

    localStorage.removeItem('user-data');
    axiosClient.defaults.headers.common['Authorization'] = '';
    document.cookie = 'auth' +'=; Expires=Thu, 18 Jan 2024 00:00:01 GMT;'

    await router.push('/auth/login')
  } catch (error) {
    console.log('Error while logging out', error);
  }
}

</script>

<style lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
