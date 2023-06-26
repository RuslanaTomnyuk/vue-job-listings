import { App } from 'vue';

export function setupErrorHandling(app: App): void {
  // By setting the app.config.errorHandler property to custom error handler function, we ensure that any uncaught errors in Vue components will be passed to this function for handling.
  app.config.errorHandler = (err, instance, info) => {

    console.error('Global error:', err);
    console.error('Vue instance::', instance);
    console.error('Error info:', info);

    // Optionally, you can display a toast or show a modal with the error message
    // using a library like Vuetify or any other UI library you prefer.
    // For example:
    // this.$toast.error('An error occurred. Please try again later.');
  };
}

// export function handleErrors(error: unknown) {
//   const customError = error as AppError
//
//   if (customError.code !== 'ERR_CANCELED') {
//     const notification = {
//       status: AppNotificationStatuses.error,
//       message: customError.response?.data?.message || customError.message,
//       title: i18n.global.t('notifications.error')
//     }
//
//     store.dispatch('notifications/createNotification', notification)
//   }
// }
