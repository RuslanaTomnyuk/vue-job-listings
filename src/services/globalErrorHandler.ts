import { App } from 'vue';

export function globalErrorHandler(app: App): void {

  app.config.errorHandler = (err, instance, info) => {
    console.error('Global error: ', err);
    console.error('Vue instance: ', instance);
    console.error('Error info: ', info);
  };
}
