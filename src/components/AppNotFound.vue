<template>
  <app-main-layout>
    <div class="not-found">
      <div class="not-found__image">
        <img
          src="http://localhost:5173/public/images/404-error.svg"
          alt="404-error"
          class="image"
        >
      </div>
      <div class="not-found__error">
        <div
          class="not-found__container"
        >
          <div class="not-found__content">
            <h2>
              {{ `The requested URL "${'/' + $route.params.pathMatch.join('/')}" could not be found` }}
              <br>
            </h2>
            <app-button
              with-job-actions
              class="not-found__button"
              :title="$t('notFound.goHome')"
              :handle-click="() => router.push({name: 'home'})"
            />
          </div>
        </div>
      </div>
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import AppMainLayout from '@/layouts/AppMainLayout.vue';
import router from '@/router/router.ts';
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__image {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .image {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__error {
    display: flex;
    flex-direction: column;
    gap: px-to-rem(15);
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: px-to-rem(15);
    align-items: center;
    }

  &__content {
    display: flex;
    flex-direction: column;
    gap: px-to-rem(5);
    align-items: center;
    max-width: px-to-rem(450);
    text-align: center;
  }
}
</style>
