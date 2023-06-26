<template>
  <app-main-layout v-if="position">
    <h1>
      {{ position.position }}
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
            :logo="position.logo"
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
            {{ position.company }}
            <div
              v-if="position.new"
              class="container__company container__company--new"
            >
              NEW!
            </div>

            <div
              v-if="position.featured"
              class="container__company container__company--featured"
            >
              FEATURED
            </div>
          </div>
          <div
            class="container__position"
          >
            {{ position.position }}
          </div>
          <div
            class="container__information"
          >
            <div class="container__dot" />
            <div
              v-for="(property, index) in preparedData"
              :key="index"
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
<script setup>
import AppMainLayout from '@/layouts/AppMainLayout.vue';
import AppLogo from '@/components/AppLogo.vue';
import AppContainer from '@/components/AppContainer.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useFetchJobs } from '@/composables/useFetchJobs';
import router from '@/router/router';
import AppButton from '@/components/AppButton.vue';

const { data: jobs } = useFetchJobs()
const route = useRoute();
const jobId = route.params.id;
const position = ref(null)

const preparedData = ref([]);

watch(jobs, () => {
  if (jobs.value) {
    position.value = jobs.value.find(position => position.id === +jobId);
  }
})

watch(position, () => {
  if (position.value) {
    return preparedData.value = [
      position.value.postedAt,
      position.value.contract,
      position.value.location,
    ]
  }
})
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
