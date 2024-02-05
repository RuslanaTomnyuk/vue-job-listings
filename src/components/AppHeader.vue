<template>
  <v-layout
    class="app-bar"
  >
    <v-toolbar
      class="app-bar"
      color="#5ba4a4"   
      image="/images/bg-header-desktop.svg"
    >
      <v-toolbar-title>
        <router-link
          v-for="route in routes"
          :key="route.name"
          class="app-bar__link"
          :to="{ name: route.name }"
        >
          {{ $t(route.translationKey) }}
        </router-link>
      </v-toolbar-title>
      <router-link        
        class="app-bar__link"
        :to="'/auth/logout'"
      >
        {{ $t('header.logout') }}
      </router-link>
      <router-link
        class="app-bar__link"
        :to="'/auth/login'"
      >
        {{ $t('header.login') }}
      </router-link>

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="top"
        transition="scale-transition"
      >
        <template #activator="{ props }">
          <v-avatar color="teal-lighten-2">
            <v-btn
              v-bind="props"
            >
              <v-icon 
                icon="mdi-account-circle"
              />
            </v-btn>
          </v-avatar>
        </template>

        <v-card min-width="200">
          <v-list>
            <v-list-item
              prepend-avatar="http://localhost:5173/public/images/find-job.jpg"
              :title="user?.username"
              :subtitle="'Logged In'"
            >
              <template #append>
                <v-btn
                  variant="text"
                  :class="fav ? 'text-red' : ''"
                  icon="mdi-heart"
                  @click="fav = !fav"
                />
              </template>
            </v-list-item>
          </v-list>
          <v-list v-if="!auth">
            <v-list-item>
              <div>{{ 'You are not Logged In' }}</div>
              
              <v-btn
                color="teal-lighten-3"
                variant="text"
                to="/auth/profile"
              >              
                Profile
              </v-btn>
              
              <v-btn
                color="teal-lighten-3"
                variant="text"
                to="/auth/login"
              >              
                {{ $t('header.login') }}
              </v-btn>
            </v-list-item>
          </v-list>
          <v-divider />
          <v-divider />
          <v-card-actions v-if="auth">
            <v-btn
              variant="text"
              color="teal-lighten-3"
              @click="logout"
            >
              {{ $t('header.logout') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
      <language-switcher />
    </v-toolbar>
  </v-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import router from '@/router/router';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useStore } from '@/composables/useStore.ts';
import axiosClient from '@/configs/axios/axiosClient';

const store = useStore()
const auth = computed(() => store.state.auth.authenticated);
const fav = ref(true)
const menu = ref(false)
const user = computed(() => store.getters.user)


const logout = async() => {
  try {
    await axiosClient.get('/auth/logout', { withCredentials: true });
    localStorage.removeItem('user-data');
    axiosClient.defaults.headers.common['Authorization'] = '';

    await router.push('/auth/login')
  } catch (error) {
    console.log('Error while logging out', error);
  }
}
const routes = computed(() => [
  { name: 'home', translationKey: 'header.home' },
  { name: 'jobList', translationKey: 'header.jobList' },
])
</script>

<style lang="scss">
.app-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(0.1 * 100vh);
  background-repeat: no-repeat;
  background-size:  cover;

  &__link {
    margin-right: px-to-rem(15);
    font-size: px-to-rem(20);
    font-weight: 400;
    line-height: px-to-rem(28);
    color: $color-bg-accent;
    text-decoration: none;

    &:hover {
      color: $color-text-secondary;
    }
  }

  @include w-to($screen-tablet) {
    height: calc(0.15 * 100vh);
    background-image: url("/images/bg-header-mobile.svg");
  }
}
</style>
