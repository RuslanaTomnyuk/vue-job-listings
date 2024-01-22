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
          <v-toolbar-title>Registration Form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="formData.username"
              name="username"
              label="User name"
              type="text"
              density="compact"
            />
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
            <v-text-field
              v-model="formData.confirmPassword"
              name="confirmPassword"
              label="Confirm Your Password"
              type="password"
              density="compact"
            />
            <v-text-field
              v-model="formData.role"
              name="role"
              label="Role"
              type="text"
              density="compact"
            />
          </v-form>
        </v-card-text>

        <v-divider />
        <v-card-actions>
          <v-spacer />
          <app-button
            :with-hover="withHover"
            title="Complete Registration"
            :handle-click="registerUserHandler"
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
import router from '@/router/router';
import AppMainLayout from '@/layouts/AppMainLayout.vue';
import AppButton from '../AppButton.vue';
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

const registerUserHandler = async () => {

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
