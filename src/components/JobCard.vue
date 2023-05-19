<template>
  <app-container
    paddings-size="normal"
    with-border
    with-shadow
  >
    <div class="container">
      <div class="position__logo">
        <app-logo
          class="logo"
          :logo="position.logo"
        />
      </div>
      <div class="container__column column-left">
        <hr class="container__line">

        <div class="position__company">
          {{ position.company }}
          <button
            v-if="position.new"
            class="position__company-new"
          >
            NEW!
          </button>
          <button
            v-if="position.featured"
            class="position__company-featured"
          >
            FEATURED
          </button>
        </div>
        <div class="position__position">
          {{ position.position }}
        </div>
        <div class="position__information">
          <span>{{ position.postedAt }}</span>
          <svg-dot />
          <span>{{ position.contract }}</span>
          <svg-dot />
          <span>{{ position.location }}</span>
        </div>
      </div>

      <div class="container__column column-right">
        <div
          v-for="(buttonTitle, index) in buttonTitles"
          :key="index"
        >
          <app-button
            v-if="buttonTitle"
            :key="position.id"
            :title="buttonTitle"
            :handle-click="handleButtonClick"
          />
        </div>
      </div>
    </div>
  </app-container>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AppLogo from './AppLogo.vue';
import AppContainer from './AppContainer.vue';
import AppButton from './AppButton.vue';
import SvgDot from './SvgDot.vue';

interface JobCardProps {
  position: JobPosition;
  handleButtonClick: (clickedButton: string) => void;
}

const props = defineProps<JobCardProps>()

const buttonTitles = ref([
  props.position.role,
  props.position.level,
  ...(props.position.languages || []),
  ...(props.position.tools || [])
]);
</script>

<style lang="scss" scoped>
  .container {
    display: flex;

    @include w-to($screen-tablet) {
      position: relative;
      display: flex;
      flex-direction: column-reverse;
    }

    & > * {
      flex: 1 0;
    }

    &__column {
      flex: 50%;
    }
  }

  .column-left {
    display: flex;
    flex-direction: column;
    gap: px-to-rem(9);
    justify-content: flex-start;
  }

  .column-right {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-end;
    color: $greenish;

    @include w-to($screen-tablet) {
      justify-content: flex-start;
      margin-top: px-to-rem(5);
    }
  }

  .container__line {
    display: block;
    margin-top: px-to-rem(10);
    content: '';
    border-top: 1.5px solid $dark-grayish-cyan;

    @include w-from($screen-tablet) {
      display: none;
    }
  }

  .position {
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

    &__company {
      display: flex;
      flex-direction: row;
      gap: px-to-rem(6);
      align-items: center;
      justify-content: flex-start;
      font-weight: 700;
      color: $greenish;

      &-new {
        display: flex;
        padding: px-to-rem(3) px-to-rem(5);
        font-size: $font-size / 1.4;
        font-weight: 700;
        color: $white;
        background-color: $greenish;
        border: none;
        border-radius: px-to-rem(20);
      }

      &-featured {
        padding: px-to-rem(3) px-to-rem(5);
        font-size: $font-size / 1.4;
        font-weight: 700;
        color: $white !important;
        background-color: $black;
        border-radius: px-to-rem(20);
      }
    }

    &__position {
      font-weight: 700;
    }

    &__information {
      display: flex;
      flex-direction: row;
      gap: px-to-rem(5);
      color: $dark-grayish-cyan;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
