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
        <!-- </v-toolbar> -->
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
              type="password"
              variant="solo"
              :rules="[validationRules.password, validationRules.required]"
              prepend-inner-icon="mdi-key"
              density="compact"
            />
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
import { reactive } from 'vue';
import router from '@/router/router';
import AppMainLayout from '@/layouts/AppMainLayout.vue';
import axiosClient, { storeAccessToken } from '@/configs/axios/axiosClient';
import { validationRules } from '../../helpers/validationRules';

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

const submit = async () => {
  try {
    const email = formData.email;
    const password = formData.password;

    const response = await axiosClient.post('/auth/login', { email, password }, {
      withCredentials: true,
    });

    if (response?.data) {      
      storeAccessToken(response.data.accessToken);
      localStorage.setItem('user-data', JSON.stringify(response.data.userData));

      await router.push('/')
    }
  } catch (error) {
    console.log('error while login', error)
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
