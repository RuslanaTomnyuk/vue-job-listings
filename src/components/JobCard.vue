<template>
  <app-container
    paddings-size="normal"
    with-border
    with-shadow
  >
    <div class="container">
      <div class="position__logo">
        <app-logo
          :avatar="position.logo"
        />
      </div>
      <div class="container__column column-left">
        <div class="position__company">
          {{ position.company }}
          <app-button
            v-if="position.new"
            class="position__company-new"
            title="NEW!"
          />
          <app-button
            v-if="position.featured"
            class="position__company-featured"
            title="FEATURED"
          />
        </div>
        <div class="position__position">
          {{ position.position }}
        </div>
        <div class="position__location">
          {{ position.postedAt }}
          {{ position.contract }}
          {{ position.location }}
        </div>
      </div>

      <div class="container__column column-right">
        <div
          v-for="(buttonTitle, index) in buttonTitles"
          :key="index"
          class="buttons"
        >
          <app-button
            v-if="buttonTitle"
            :key="position.id"
            class="button"
            :title="buttonTitle"
            @click="handleButtonClick(buttonTitle)"
          />
        </div>
      </div>
    </div>
  </app-container>
</template>
<script setup lang="ts">
import AppLogo from './AppLogo.vue';
import AppContainer from './AppContainer.vue';
import AppButton from './AppButton.vue';
import { ref } from 'vue';
import data from '../../data.json'

interface JobCardProps {
  position: JobPosition;
}

const props = defineProps<JobCardProps>()
// console.log('props.position', props.position)

const buttonTitles = ref([
  props.position.role,
  props.position.level,
  ...(props.position.languages || []),
  ...(props.position.tools || [])
]);

// console.log('buttonTitles', buttonTitles.value) // array of strings

const clickedButtons = ref([])

const handleButtonClick = (buttonTitle: string) => {
  if (clickedButtons.value.includes(buttonTitle)) {
    clickedButtons.value = clickedButtons.value.filter((btn) => btn !== buttonTitle);
  } else {
    clickedButtons.value.push(buttonTitle);
    // console.log('clickedButtons', clickedButtons.value)
  }
}
const filteredData = ref([])
data.forEach(obj => {
  const role = obj.role;
  if (!filteredData.value.includes(role)) {
    filteredData.value.push(role);
  }
})

// const filteredData = ref(() => {
//   return buttonTitles.value.filter((button) => clickedButtons.value.includes(button));
// });

// watch(filteredData, () => console.log('filteredData', filteredData.value))

</script>

<style lang="scss" scoped>
  .container {
    display: flex;

    & > * {
      flex: 1 0;
    }

    &__logo {
      margin-right: px-to-rem(10);
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
    }

    .position {
      &__logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: px-to-rem(10);
      }

      &__company {
        font-weight: 700;
        color: $greenish;

        &-new {
          padding: px-to-rem(3) px-to-rem(5);
          font-size: $font-size / 1.4;
          font-weight: 700;
          color: $white !important;
          background-color: $greenish;
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

      &__location {
        display: flex;
        flex-direction: row;
        gap: px-to-rem(10);
        color: $dark-grayish-cyan;
      }
    }

    .button {
      color: $greenish;
    }
</style>
