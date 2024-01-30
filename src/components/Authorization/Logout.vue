<template>
  <app-main-layout>
    <div class="wrapper">
      <v-card-actions>
        <v-btn
          variant="outlined"
          color="teal-lighten-3"
          @click="logout"
        >
          {{ $t('header.logout') }}
        </v-btn>
      </v-card-actions>
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import router from '@/router/router';
import AppMainLayout from '@/layouts/AppMainLayout.vue';
import axiosClient from '@/configs/axios/axiosClient';
import { useStore } from '@/composables/useStore.ts';

interface LogoutProps {
  withHover?: boolean;
}

defineProps<LogoutProps>()

const store = useStore()

const logout = async() => {
  try {
    await axiosClient.get('/auth/logout', { withCredentials: true });

    localStorage.removeItem('user-data');
    axiosClient.defaults.headers.common['Authorization'] = 'Bearer ';

    await store.dispatch('setAuth', false)
    
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
