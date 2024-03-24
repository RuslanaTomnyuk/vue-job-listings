<template>
  <app-main-layout>
    <h2>Profile</h2>
    <div class="profile">
      <v-card
        max-width="300"
        height="200"
      >
        <img
          class="profile__avatar"
          src="http://localhost:5173/public/images/find-job.jpg"
          alt="user-photo"
        >
      </v-card>

      <v-card class="profile__info">
        <v-tabs
          v-model="tab"
          bg-color="teal-lighten-3"
          color="white"
        >
          <v-tab
            v-for="item in tabItems"
            :key="item"
            :value="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-window
          v-model="tab"
        >
          <v-window-item
            v-for="item in tabItems"
            :key="item"
            :value="item"
          >
            <v-card
              flat
            >
              <v-card-text>
                <app-form-container
                  v-model="formData"
                  :fields="fields"
                  :tab-item="item"
                />
              </v-card-text>
            </v-card>
            <app-button
              with-actions
              :title="$t('profile.saveChanges')"
              :handle-click="item === $t('profile.edit') ? editProfileHandler : changePasswordHandler"
            />
          </v-window-item>
        </v-window>
      </v-card>
    </div>
  </app-main-layout>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue';
import router from '@/router/router';
import AppMainLayout from '@/layouts/AppMainLayout.vue';
import AppFormContainer from '../AppFormContainer.vue';
import AppButton from '../AppButton.vue';
import i18n from '@/configs/i18n/i18n';
import axiosClient from '@/configs/axios/axiosClient';
import { storeAccessToken } from '@/helpers/storeAccessToken';
import { useToast } from 'vue-toastification';

const toast = useToast();
const tabItems = computed(() => [
  i18n.global.t('profile.edit'), i18n.global.t('profile.changePassword'),
])

const tab = ref(null);

const user = computed(() => {
  const userData = localStorage.getItem('user-data');
  return userData && JSON.parse(userData)
});

interface FormDataForm {
  username: string,
  email: string,
  password: string,
  newPassword: string,
  confirmNewPassword: string,
}

const formData = reactive<FormDataForm>({
  username: user.value.username,
  email: user.value.email,
  password: '',
  newPassword: '',
  confirmNewPassword: '',
})

const fields = computed(() => [
  {
    key: 'username',
    label: i18n.global.t('profile.name'),
    isRequired: true,
    isEditTab: true
  },
  {
    key: 'email',
    label: i18n.global.t('profile.email'),
    isRequired: true,
    isEditTab: true
  },
  {
    key: 'password',
    label: i18n.global.t('profile.password'),
    isRequired: true,
    isEditTab: true
  },
  {
    key: 'currentPassword',
    label: i18n.global.t('profile.currentPassword'),
    isRequired: true,
    isChangePasswordTab: true
  },
  {
    key: 'newPassword',
    label: i18n.global.t('profile.newPassword'),
    isRequired: true,
    isChangePasswordTab: true
  },
  {
    key: 'confirmNewPassword',
    label: i18n.global.t('profile.confirmNewPassword'),
    isRequired: true,
    isChangePasswordTab: true
  }
])

const editProfileHandler = async () => {
  try {
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      throw new Error('All fields are required!')
    }

    const response = await axiosClient.patch('/auth/profile', { username, email, password });
    if (response?.data?.status === 200) {            
      toast.success(response?.data.message);
    }
  } catch (error) {
    console.log('error while editing user profile', error)
  }
};

const changePasswordHandler = async () => {
  try {
    const { password: currentPassword, newPassword: password, confirmNewPassword: confirmPassword } = formData;
    
    if (!currentPassword || !password || !confirmPassword) {
      throw new Error('All fields are required!')
    }

    const response = await axiosClient.patch('/auth/change-password', { currentPassword, password, confirmPassword });

    if (response?.data?.status === 200) {            
      storeAccessToken(response?.data.token);
      toast.success(response?.data.message);

      await router.push('/')
    }
    
  } catch (error) {
    console.log('error while changing password', error)
  }
};

</script>
<style lang="scss">
.profile {
  display: flex;
  flex-direction: row;
  gap: px-to-rem(10);

  @include w-to($screen-tablet) {
    flex-direction: column;
  }

  &__avatar {
    display: flex;
    width: 100%;
    min-width: px-to-rem(150);
    height: 100%;
    object-fit: cover;
  }

  &__info {
    width: 100%;
    max-width: px-to-rem(650);
  }
}
</style>

