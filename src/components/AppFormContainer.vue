<template v-if="fields && data">
  <template
    v-for="{ key, label, isEditTab, isChangePasswordTab, ...fieldProps } in fields"
    :key="key"
  >
    <v-form v-if="data">
      <app-text-field
        v-if="isEditTab && tabItem === $t('profile.edit')"
        v-model="data[key]"
        :label="label"
        v-bind="fieldProps"
        :placeholder="label"
        :with-append-inner-icon="label === $t('profile.password')"
      />

      <app-text-field
        v-if="isChangePasswordTab && tabItem === $t('profile.changePassword')"
        v-model="data[key]"
        :label="label"
        v-bind="fieldProps"
        :placeholder="label"
        with-append-inner-icon
      />
    </v-form>
  </template>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { VForm } from 'vuetify/lib/components/index.mjs';
import AppTextField from './AppTextField.vue';

interface AppFormContainerProps {
  title?: string;
  handleSubmit?: () => void;
  handleCancel?: () => void;
  fields?: any[];
  modelValue?: Record<string, string | number>;
  tabItem?: string; 
}

const props = defineProps<AppFormContainerProps>();

const emit = defineEmits([ 'update:modelValue' ]);

const data = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>