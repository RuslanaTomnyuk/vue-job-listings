<template>
  <div class="field-wrap">
    <div
      v-if="label"
      class="field-wrap__title"
    >
      {{ label }}
    </div>
    <v-text-field        
      v-bind="$attrs"  
      v-model="value"   
      persistent-hint             
      hide-details="auto"
      :label="label"
      :rules="validationRules"
      density="compact"
      variant="solo"
      :type="withAppendInnerIcon ? passwordFieldType : 'text'"
      :placeholder="placeholder"
      :append-inner-icon="withAppendInnerIcon ? showPassword ? 'mdi-eye-off' : 'mdi-eye' : ''"
      @click:append-inner="() => (showPassword = !showPassword)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useValidation } from '../composables/useValidation';
import { AppValidationTypes } from '@/types/enums';

interface AppTextFieldProps {
  modelValue: string;
  type?: 'password' | 'text';
  label: string;
  placeholder?: string;
  withAppendInnerIcon?: boolean;
  isRequired?: boolean;
  validationType?: AppValidationTypes;
}

const props = withDefaults(defineProps<AppTextFieldProps>(), {
  type: 'text'
});

const { validationRules } = useValidation(props);

const showPassword = ref(false);
const passwordFieldType = computed(() => showPassword.value ? 'text' : 'password');

const emit = defineEmits([ 'update:modelValue' ]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', props.validationType === AppValidationTypes.email ? value?.toLowerCase() : value),
});
</script>
<style lang="scss">
  .field-wrap {
    display: flex;
    gap: px-to-rem(10);
    margin-top: px-to-rem(10);

    &__title {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: px-to-rem(10) 0;
    }
  }
</style>

