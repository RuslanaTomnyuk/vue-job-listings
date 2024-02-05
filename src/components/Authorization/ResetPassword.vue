<template>
  <app-main-layout>
    <div class="wrapper">
      <v-card
        width="320"
        max-width="800"
      >
        <v-card-text>
          <v-form @submit.prevent="submit">
            <v-text-field
              v-model="formData.password"
              :label="$t('login.password')"
              type="password"
              variant="solo"
              :rules="[validationRules.password, validationRules.required]"
              prepend-inner-icon="mdi-key"
              density="compact"
            />
            <v-text-field
              v-model="formData.confirmPassword"
              :label="$t('register.confirmPassword')"
              type="password"
              variant="solo"
              :rules="[validationRules.confirmPassword, validationRules.required]"
              prepend-inner-icon="mdi-key"
              density="compact"
            />

            <v-btn
              color="teal-lighten-3"
              variant="elevated"
              type="submit"
              block
              class="mt-2"
            >
              {{ $t('login.submit') }}
            </v-btn>
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
import axiosClient from '@/configs/axios/axiosClient';
import { validationRules } from '../../helpers/validationRules';
import { useRoute } from 'vue-router';
import { storeAccessToken } from '../../helpers/storeAccessToken'; 
import { AxiosError } from 'axios';
import errorHandler from '@/services/errorHandler';
import { useToast } from 'vue-toastification';

interface LoginProps {
  withHover?: boolean;
}

defineProps<LoginProps>()

const route = useRoute();
const token = route.params.token;
const id = +route.params.id

interface FormData {
  password: string,
  confirmPassword: string,
}

const formData: FormData = reactive({
  password: '',
  confirmPassword: '',
})

const toast = useToast();

const submit = async () => {
  try {
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    const { data } = await axiosClient.patch(`/auth/reset-password/${id}/${token}`, { password, confirmPassword });

    if (data?.status === 200) {            
      storeAccessToken(data.token);
      toast.success(data.message);

      await router.push('/')
    }
  } catch (error: unknown) {
    console.log('error while resetting password', error)
    errorHandler(error as AxiosError)
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
