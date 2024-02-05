<template>
  <app-main-layout>
    <div class="wrapper">
      <v-card
        width="320"
        max-width="800"
      >
        <v-card-title class="text-center">
          {{ $t('login.loginForm') }}
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="formData.email"
              prepend-inner-icon="mdi-email"
              :label="$t('login.email')"
              :rules="[validationRules.email, validationRules.required]"
              variant="solo"
              persistent-hint
              density="compact"              
            />
            <v-text-field
              v-model="formData.password"
              :label="$t('login.password')"
              :type="passwordFieldType"
              variant="solo"
              :rules="[validationRules.password, validationRules.required]"
              prepend-inner-icon="mdi-key"
              density="compact"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="() => (showPassword = !showPassword)"
            />
            <p class="text-right">
              <router-link to="/auth/forgot-password">
                {{ $t('login.forgotPassword') }}
              </router-link>
            </p>
            <v-divider />
            <v-btn
              color="teal-lighten-3"
              variant="elevated"
              type="submit"
              block
              class="mt-2"
            >
              {{ $t('login.submit') }}
            </v-btn>

            <v-card-title>
              {{ $t('login.haveAccount') }} 
              <v-btn
                block
                to="/auth/register"
              >
                {{ $t('register.register') }}
              </v-btn>
            </v-card-title>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue';
import router from '@/router/router';
import AppMainLayout from '@/layouts/AppMainLayout.vue';
import { validationRules } from '../../helpers/validationRules';
import loginUser from '@/services/loginUser';
import errorHandler from '@/services/errorHandler';
import { AxiosError } from 'axios';

interface LoginProps {
  withHover?: boolean;
}

defineProps<LoginProps>()

interface FormData {
  email: string,
  password: string,
}

const formData: FormData = reactive({
  email: '',
  password: '',
})

const showPassword = ref(false);
const passwordFieldType = computed(() => showPassword.value ? 'text' : 'password');

const submit = async () => {
  try {
    const email = formData.email;
    const password = formData.password;

    await loginUser(email, password)

    await router.push('/')
    // }
  } catch (error) {
    console.log('error while login', error)
    errorHandler(error as AxiosError);
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
