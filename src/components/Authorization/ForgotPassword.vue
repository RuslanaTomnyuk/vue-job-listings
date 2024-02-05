<template>
  <app-main-layout>
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
  </app-main-layout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import AppMainLayout from '@/layouts/AppMainLayout.vue';
import { validationRules } from '../../helpers/validationRules';
import axiosClient from '@/configs/axios/axiosClient';
import errorHandler from '@/services/errorHandler';
import { AxiosError } from 'axios';
import { useToast } from 'vue-toastification';

interface FormData {
  email: string,
}

const formData: FormData = reactive({
  email: '',
})

const toast = useToast();

const submit = async () => { 
  try {
    const { data } = await axiosClient.post('/auth/forgot-password', { email: formData.email }, {
      withCredentials: true,
    });

    if(data.status === 200){
      toast.success(data.message)
    } 
  } catch (error) {
    console.error(error);
    errorHandler(error as AxiosError)
  }
}
</script>