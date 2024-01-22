<template>
  <v-layout
    class="app-bar"
  >
    <v-app-bar
      class="app-bar"
      color="#5ba4a4"
      image="/images/bg-header-desktop.svg"
    >
      <v-app-bar-title>
        <router-link
          v-for="route in routes"
          :key="route.name"
          class="app-bar__link"
          :to="{ name: route.name }"
        >
          {{ $t(route.translationKey) }}
        </router-link>
      </v-app-bar-title>
      <!-- <v-spacer /> -->
      <v-app-bar-title>
        <router-link
          v-for="route in authRoutes"
          :key="route.name"
          class="app-bar__link"
          :to="{ name: route.name }"
        >
          {{ $t(route.translationKey) }}
        </router-link>
      </v-app-bar-title>

      <v-app-bar-title>
        <router-link
          v-for="route in logoutRoute"
          :key="route.name"
          class="app-bar__link"
          :to="{ name: route.name }"
        >
          {{ $t(route.translationKey) }}
        </router-link>
      </v-app-bar-title>
      <v-spacer />
      <language-switcher />
    </v-app-bar>
  </v-layout>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { computed } from 'vue';

const routes = computed(() => [
  { name: 'home', translationKey: 'header.home' },
  { name: 'jobList', translationKey: 'header.jobList' },
])

const authRoutes = computed(() => [
  { name: 'login', translationKey: 'header.login' },
  { name: 'register', translationKey: 'header.register' },
])

const logoutRoute = computed(() => [
  { name: 'logout', translationKey: 'header.logout' },
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
