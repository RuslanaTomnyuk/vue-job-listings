<template>
  <main
    :class="{
      [`page page--${widthType}`]: true,
    }"
  >
    <!--    <app-container-->
    <!--      paddings-size="normal"-->
    <!--      with-border-->
    <!--      with-shadow-->
    <!--    >-->
    <!--      <filters />-->
    <!--    </app-container>-->
    <div class="page__content">
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
interface AppMainLayoutProps {
  title?: string;
  widthType?: 'normal' | 'wide' | 'narrow';
  withNoPaddingsOnMobile?: boolean;
}

withDefaults(defineProps<AppMainLayoutProps>(), {
  widthType: 'normal',
})

</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: px-to-rem(30);
  max-width: 100%;
  height: auto;
  padding: px-to-rem(30) px-to-rem(50)
;
  background-color: $light-green;

  &__content {
    display: flex;
    flex-direction: column;
    gap: px-to-rem(20);
  }
}
</style>
