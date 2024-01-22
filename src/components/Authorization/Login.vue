<template>
  <app-main-layout>
    <div class="wrapper">
      <v-card
        width="360"
        max-width="600"
      >
        <v-toolbar
          dark
          color="teal-lighten-3"
        >
          <v-toolbar-title>Login Form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="formData.email"
              name="email"
              label="E-mail"
              type="text"
              density="compact"
            />
            <v-text-field
              v-model="formData.password"
              name="password"
              label="Password"
              type="password"
              density="compact"
            />
          </v-form>
        </v-card-text>

        <v-divider />
        <v-card-actions>
          <v-spacer />
          <app-button
            :with-hover="withHover"
            title="Login"
            :handle-click="loginTo"
          />
        <!-- <v-btn color="success">
          Complete Registration
          <v-icon
            icon="mdi-chevron-right"
            end
          />
        </v-btn> -->
        </v-card-actions>
      </v-card>
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import AppMainLayout from '@/layouts/AppMainLayout.vue';
import AppButton from '../AppButton.vue';

import axiosClient, { storeAccessToken } from '@/configs/axios/axiosClient';

import router from '@/router/router';

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

const loginTo = async () => {
  try {
    const email = formData.email;
    const password = formData.password;

    const { data } = await axiosClient.post('/auth/login', { email, password }, {
      withCredentials: true,
    });

    if (data) {
      storeAccessToken(data.accessToken);
      localStorage.setItem('user-data', JSON.stringify(data.userData));

      await router.push('/')
    }
  } catch (error: unknown) {
    console.log('error while login', error)
  }
}

// const fields = computed(() => [
//   { key: FORM_FIELDS.FIRST_NAME, validationType: AppValidationTypes.firstName, isRequired: true },
//   { key: 'email', validationType: AppValidationTypes.email, isRequired: true },
//   { key: 'password', validationType: AppValidationTypes.password, isRequired: true },
//   { key: 'confirmPassword', validationType: AppValidationTypes.confirmPassword, isRequired: true },
// ]);

</script>

<style lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
../../interfaces/enums
