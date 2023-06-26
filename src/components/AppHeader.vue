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
          class="app-bar__link"
          :to="{ name: 'home' }"
        >
          Home
        </router-link>
        <router-link
          class="app-bar__link"
          :to="{ name: 'jobList' }"
        >
          Job List
        </router-link>
      </v-app-bar-title>
    </v-app-bar>
  </v-layout>
</template>

<script setup>

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
    margin-right: 20px;
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

.header {
  height: calc(0.1 * 100vh);
  background-color: $color-bg-secondary;
  background-image: url("/images/bg-header-desktop.svg");
  background-repeat: no-repeat;
  background-size:  cover;

  @include w-to($screen-tablet) {
    height: calc(0.15 * 100vh);
    background-image: url("/images/bg-header-mobile.svg");
  }
}
</style>
