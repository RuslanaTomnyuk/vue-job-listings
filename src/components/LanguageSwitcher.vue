<template>
  <select
    class="language-switcher"
    @change="switchLanguage"
  >
    <option
      v-for="slocale in supportedLocales"
      :key="slocale"
      :value="slocale"
      :selected="locale === slocale"
    >
      {{ t(`locale.${slocale}`) }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import switcher, { NewLocale } from '@/helpers/translation.ts'
import { useToast } from 'vue-toastification';

const supportedLocales = switcher.supportedLocales
const { t, locale } = useI18n({ useScope: 'global' })
const toast = useToast();

const switchLanguage = async (event) => {
  const newLocale = event.target.value

  if (newLocale !== locale) {
    toast.info('You\'ve changed language')
    await switcher.switchLanguage(newLocale)
  }
}

onMounted(async () => {
  const savedLocale = localStorage.getItem('lang');
  const targetLocale = savedLocale || NewLocale.en;
  await switcher.switchLanguage(targetLocale as NewLocale);
})
</script>

<style lang="scss">
.language-switcher {
  margin-right: px-to-rem(10);
  font: $font-default;
  cursor: pointer;
  background-color: transparent;
  border: none;
}
</style>
