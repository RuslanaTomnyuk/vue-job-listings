<template>
  <app-container
    paddings-size="normal"
    with-border
    with-shadow
  >
    <div
      class="container"
    >
      <div class="container__logo">
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
            v-if="position.newPosition"
            class="container__company container__company--new"
          >
            {{ $t("jobCard.newPosition") }}
          </div>
          <div
            v-if="position.featured"
            class="container__company container__company--featured"
          >
            {{ $t("jobCard.featured") }}
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
      <div class="container__right">
        <div
          v-for="(filter, index) in jobFilters"
          :key="index"
        >
          <app-button
            v-if="filter"
            :key="index"
            :title="filter as string"
            :handle-click="() => handleAddToFilter ? handleAddToFilter(filter as string) : null"
          />
        </div>
      </div>
    </div>
  </app-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppLogo from '../AppLogo.vue';
import AppContainer from '../AppContainer.vue';
import AppButton from '../AppButton.vue';

interface JobCardProps {
  position: JobPosition;
  handleAddToFilter?: (filter: string) => void;
}

const props = defineProps<JobCardProps>()

const preparedData = [
  props.position.postedAt,
  props.position.contract,
  props.position.location,
];

const jobFilters = ref([
  props.position.role,
  props.position.level,
  ...(props.position.languages || []),
  ...(props.position.tools || [])
]);
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
      border-top: px-to-rem(1) solid $dark-grayish-cyan;

      @include w-from($screen-tablet) {
        display: none;
      }
    }

    &__left {
      display: flex;
      flex: 50%;
      flex-direction: column;
      gap: px-to-rem(10);
      justify-content: flex-start;
    }

    &__information {
      display: flex;
      flex-direction: row;
      gap: px-to-rem(5);
      align-items: center;
      color: $dark-grayish-cyan;
    }

    &__dot {
      position: relative;
      width: px-to-rem(3);
      height: px-to-rem(3);
      background-color: $dark-grayish-cyan;
      border-radius: 50%;
    }

    &__position {
      font-weight: 700;
    }

    &__company {
      display: flex;
      flex-direction: row;
      gap: px-to-rem(5);
      align-items: center;
      justify-content: flex-start;
      font-weight: 700;
      color: $color-text-primary;

      &--new {
        display: flex;
        padding: px-to-rem(5);
        font: $font-extra-small;
        color: $color-text-secondary;
        background-color: $color-bg-secondary;
        border: none;
        border-radius: px-to-rem(25);
      }

      &--featured {
        display: flex;
        padding: px-to-rem(5);
        font: $font-extra-small;
        color: $color-text-secondary !important;
        background-color: $color-bg-accent;
        border-radius: px-to-rem(25);
      }
    }

    &__right {
      display: flex;
      flex: 50%;
      flex-flow: row wrap;
      align-items: center;
      justify-content: flex-end;
      color: $color-text-primary;

      @include w-to($screen-tablet) {
        justify-content: flex-start;
        margin-top: px-to-rem(5);
      }
    }
  }
</style>
