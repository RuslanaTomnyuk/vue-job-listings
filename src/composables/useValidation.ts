import { computed } from 'vue';
import { AppValidationTypes } from '@/types/enums';
// import { FORM_SYMBOLS_VALIDATION } from '@/constants/validation';

interface ValidationRulesParams {
  key: string;
  isRequired?: boolean;
  label?: string;
  validationType?: AppValidationTypes;
}
type AppValidationRule = (value: string | number) => boolean | string;

export const useValidation = (props: ValidationRulesParams) => {
  const validationRules = computed(() => {
    const validationRules: AppValidationRule[] = [];

    validationRules.push((value) => !!value || `${props.label} is required`);

    if (props.label === 'Name') {
      validationRules.push(
        (value) =>
          !value ||
          (value as string).trim().length >= 3 ||
          `${props.label} must be at least 3 characters long`
      );
    }

    if (props.label === 'Email') {
      const emailRegExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      validationRules.push(
        (value) =>
          emailRegExp.test(value as string) || `${props.label} must be valid`
      );
    }

    if (props.label === 'Password') {
      validationRules.push(
        (value) =>
          !value ||
          (value as string).trim().length >= 8 ||
          `${props.label} must be at least 8 characters long`
      );
    }

    if (props.label === 'Current Password') {
      validationRules.push(
        (value) =>
          !value ||
          (value as string).trim().length >= 8 ||
          `${props.label} must be at least 8 characters long`
      );
    }

    if (props.label === 'New Password') {
      validationRules.push(
        (value) =>
          !value ||
          (value as string).trim().length >= 8 ||
          `${props.label} must be at least 8 characters long`
      );
    }

    if (props.label === 'Confirm New Password') {
      validationRules.push(
        (value) =>
          !value ||
          (value as string).trim().length >= 8 ||
          `${props.label} must be at least 8 characters long and match the password`
      );
    }

    return validationRules;
  });

  return { validationRules };
};
