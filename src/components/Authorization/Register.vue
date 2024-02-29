<template>
  <app-main-layout>
    <div class="wrapper">
      <v-card
        width="360"
        max-width="600"
      >
        <v-card-title class="text-center">
          {{ $t('register.registerForm') }}
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitRegistration">
            <v-text-field
              v-model="formData.username"
              :label="$t('register.username')"
              :rules="[validateRules.required]"
              density="compact"
              variant="solo"
            />
            <v-text-field
              v-model="formData.email"
              prepend-inner-icon="mdi-email"
              :label="$t('register.email')"
              :rules="[validateRules.email, validateRules.required]"
              variant="solo"
              persistent-hint
              density="compact"              
            />
            <v-text-field
              v-model="formData.password"
              :label="$t('register.password')"
              :type="passwordFieldType"
              variant="solo"
              :rules="[validateRules.password, validateRules.required]"
              prepend-inner-icon="mdi-key"
              density="compact"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="() => (showPassword = !showPassword)"
            />
            <v-text-field
              v-model="formData.confirmPassword"
              :label="$t('register.confirmPassword')"
              :type="confirmPasswordFieldType"
              variant="solo"
              :rules="[validateRules.confirmPassword, validateRules.required]"
              prepend-inner-icon="mdi-key"
              density="compact"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="() => (showConfirmPassword = !showConfirmPassword)"
            />
            <v-text-field
              v-model="formData.role"
              name="role"
              :label="$t('register.role')"
              density="compact"
              variant="solo"
            />
            <v-btn
              color="teal-lighten-3"
              variant="elevated"
              type="submit"
              block
              class="mt-2"
            >
              {{ $t('register.register') }}
            </v-btn>
          </v-form>
        </v-card-text>

        <v-divider />
      </v-card>
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import router from '@/router/router';
import AppMainLayout from '@/layouts/AppMainLayout.vue';
import { validateRules } from '../../helpers/validationRules';
import axiosClient from '@/configs/axios/axiosClient';

interface RegisterProps {
  withHover?: boolean;
}

defineProps<RegisterProps>()

interface FormData {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: string,
}

const formData: FormData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: ''
})

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordFieldType = computed(() => showPassword.value ? 'text' : 'password');
const confirmPasswordFieldType = computed(() => showConfirmPassword.value ? 'text' : 'password');

const submitRegistration = async () => {
  try {
    const username = formData.username
    const email = formData.email
    const password = formData.password
    const confirmPassword = formData.confirmPassword
    const role = formData.role

    const response = await axiosClient.post('/auth/register', { username, email, password, confirmPassword, role }, { withCredentials: true });

    if (response.data.status === 201) {
      router.push('/auth/login')
    }

    return response.data;
  } catch (error: unknown) {
    throw new Error('error');
  }

}
</script>

<style lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
