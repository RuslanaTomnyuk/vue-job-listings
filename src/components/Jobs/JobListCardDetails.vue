<template>
  <app-main-layout v-if="jobPositionById">
    <h1>
      {{ jobPositionById.position }}
    </h1>
    <app-container
      paddings-size="normal"
      with-border
      with-shadow
    >
      <div
        class="container"
      >
        <div
          class="container__logo"
        >
          <app-logo
            :logo="jobPositionById.logo"
            placeholder="logo"
          />
        </div>
        <div
          class="container__left"
        >
          <hr class="container__line">
          <div
            class="container__company"
          >
            {{ jobPositionById.company }}
            <div
              v-if="jobPositionById.new"
              class="container__company container__company--new"
            >
              {{ $t("jobCard.new") }}
            </div>

            <div
              v-if="jobPositionById.featured"
              class="container__company container__company--featured"
            >
              {{ $t("jobCard.featured") }}
            </div>
          </div>
          <div
            class="container__position"
          >
            {{ jobPositionById.position }}
          </div>
          <div
            class="container__information"
          >
            <div class="container__dot" />
            <div
              v-for="(property) in preparedData"
              :key="property"
              :title="property"
              class="container__information container__information--dot"
            >
              {{ property }}
              <div class="container__dot" />
            </div>
          </div>
        </div>
      </div>
    </app-container>
  </app-main-layout>

  <div class="container__buttons">
    <app-button
      title="< Back"
      :handle-click="() => router.back()"
    />
    <app-button
      title="Home"
      :handle-click="() => router.push({ name: 'home' })"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppMainLayout from '@/layouts/AppMainLayout.vue';
import AppLogo from '@/components/AppLogo.vue';
import AppContainer from '@/components/AppContainer.vue';
import AppButton from '@/components/AppButton.vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/composables/useStore.ts';

import router from '@/router/router';

const store = useStore()
const route = useRoute();
const jobId = +route.params.id;

const jobPositionById = computed<JobPosition>(() => store.getters.getJobPositionById(jobId))

const preparedData = computed(() => jobPositionById.value && [
  jobPositionById.value.postedAt,
  jobPositionById.value.contract,
  jobPositionById.value.location,
] )

store.dispatch('fetchJobList')
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  cursor: pointer;

  @include w-to($screen-tablet) {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
  }

  & > * {
    flex: 1 0;
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;

    @include w-to($screen-tablet) {
      position: absolute;
      top: -55px;
      left: 0;
    }
  }

  &__line {
    display: block;
    width: 100%;
    margin-top: px-to-rem(10);
    content: '';
    border-top: 1.5px solid $dark-grayish-cyan;

    @include w-from($screen-tablet) {
      display: none;
    }
  }

  &__left {
    display: flex;
    flex: 50%;
    flex-direction: column;
    gap: px-to-rem(9);
    justify-content: flex-start;
  }

  &__information {
    display: flex;
    flex-direction: row;
    gap: px-to-rem(7);
    align-items: center;
    color: $dark-grayish-cyan;
  }

  &__dot {
    position: relative;
    width: 4px;
    height: 4px;
    background-color: $dark-grayish-cyan;
    border-radius: 50%;
  }

  &__position {
    font-weight: 700;
  }

  &__company {
    display: flex;
    flex-direction: row;
    gap: px-to-rem(6);
    align-items: center;
    justify-content: flex-start;
    font-weight: 700;
    color: $color-text-primary;

    &--new {
      display: flex;
      padding: px-to-rem(3) px-to-rem(5);
      font: $font-extra-small;
      color: $color-text-secondary;
      background-color: $color-bg-secondary;
      border: none;
      border-radius: px-to-rem(20);
    }

    &--featured {
      display: flex;
      padding: px-to-rem(3) px-to-rem(5);
      font: $font-extra-small;
      color: $color-text-secondary !important;
      background-color: $color-bg-accent;
      border-radius: px-to-rem(20);
    }
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    gap: px-to-rem(7);
    align-items: center;
    justify-content: center;
  }
}
</style>
