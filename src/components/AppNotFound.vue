<template>
  <app-main-layout>
    <div class="error">
      <div class="number">
        4
      </div>
      <div class="illustration">
        <div class="circle" />
        <div class="clip">
          <div class="paper">
            <div class="face">
              <div class="eyes">
                <div class="eye eye-left" />
                <div class="eye eye-right" />
              </div>
              <div class="rosyCheeks rosyCheeks-left" />
              <div class="rosyCheeks rosyCheeks-right" />
              <div class="mouth" />
            </div>
          </div>
        </div>
      </div>
      <div class="number">
        4
      </div>
    </div>

    <div class="not-found">
      <div
        class="not-found__container"
      >
        <div class="not-found__content">
          <h2>
            {{ `The requested URL "${'/' + $route.params.pathMatch.join('/')}" could not be found` }}
            <br>
          </h2>
          <app-button
            class="not-found__button"
            title="Go back home"
            :handle-click="() => router.push({name: 'home'})"
          />
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
.error {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}

.number {
  font-size: 15rem;
  font-weight: 700;
  line-height: 1;
}

.illustration {
  position: relative;
  width: 12.2rem;
  margin: 0 2.1rem;
}

.circle {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 12.2rem;
  height: 11.4rem;
  background-color: $color-bg-additional;
  border-radius: 50%;
}

.clip {
  position: absolute;
  bottom: 0.3rem;
  left: 50%;
  width: 12.5rem;
  height: 13rem;
  overflow: hidden;
  border-radius: 0 0 50% 50%;
  transform: translateX(-50%);
}

.paper {
  position: absolute;
  bottom: -0.3rem;
  left: 50%;
  width: 9.2rem;
  height: 12.4rem;
  background-color: $color-bg-block;
  border: 0.3rem solid $color-accent;
  border-radius: 0.8rem;
  transform: translateX(-50%);

  &::before {
    position: absolute;
    top: -0.7rem;
    right: -0.7rem;
    width: 1.4rem;
    height: 1rem;
    content: "";
    background-color: $color-bg-block;
    border-bottom: 0.3rem solid $color-accent;
    transform: rotate(45deg);
  }
}

.face {
  position: relative;
  margin-top: 2.3rem;
}

.eyes {
  position: absolute;
  top: 0;
  left: 2.4rem;
  width: 4.6rem;
  height: 0.8rem;
}

.eye {
  position: absolute;
  bottom: 0;
  width: 0.8rem;
  height: 0.8rem;
  background-color: $color-bg-additional;
  border-radius: 50%;
  animation-name: eye;
  animation-duration: 4s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;

  &-left {
    left: 0;
  }

  &-right {
    right: 0;
  }
}

@keyframes eye {
  0% {
    height: 0.8rem;
  }

  50% {
    height: 0.8rem;
  }

  52% {
    height: 0.1rem;
  }

  54% {
    height: 0.8rem;
  }

  100% {
    height: 0.8rem;
  }
}

.rosyCheeks {
  position: absolute;
  top: 1.6rem;
  width: 1rem;
  height: 0.2rem;
  background-color: $color-bg-highlighted;
  border-radius: 50%;

  &-left {
    left: 1.4rem;
  }

  &-right {
    right: 1.4rem;
  }
}

.mouth {
  position: absolute;
  top: 3.1rem;
  left: 50%;
  width: 1.6rem;
  height: 0.2rem;
  background-color: $color-bg-additional;
  border-radius: 0.1rem;
  transform: translateX(-50%);
}

.not-found {
  display: flex;
  flex-direction: column;
  gap: px-to-rem(15);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

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
