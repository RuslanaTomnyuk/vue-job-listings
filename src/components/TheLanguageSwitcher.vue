<template>
  <select
    class="language-switcher"
    @change="switchLanguage"
  >
    <option
      v-for="(slocale, i) in supportedLocales"
      :key="`slocale${i}`"
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
const { t, locale } = useI18n({ useScope: 'global' })
import switcher, { NewLocale } from '@/helpers/translation.ts'
import { useToast } from 'vue-toastification';

const supportedLocales = switcher.supportedLocales
const toast = useToast();

const switchLanguage = async (event) => {
  const newLocale = event.target.value

  if (newLocale !== locale) {
    toast.info('You\'ve changed language')
  }

  await switcher.switchLanguage(newLocale)
}

onMounted(async () => {
  const savedLocale = localStorage.getItem('user-locale');
  if (savedLocale) {
    await switcher.switchLanguage(savedLocale as NewLocale);
  } else {
    await switcher.switchLanguage(NewLocale.en);
  }
})
</script>

<style lang="scss">
.language-switcher {
  margin-right: 10px;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  cursor: pointer;
  background-color: transparent;
  border: none;
}
</style>
