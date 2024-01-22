import { computed } from 'vue';
import { AppValidationTypes } from '@/interfaces/enums';
import { FORM_SYMBOLS_VALIDATION } from '@/constants/validation';

export interface GetValidationRulesParams {
  isRequired?: boolean;
  label?: string;
  validationType?: AppValidationTypes;
}
type AppValidationRule = (value: string | number) => boolean | string;

export const useValidation = (props: GetValidationRulesParams) => {
  const validationRules = computed(() => {
    const validationRules: AppValidationRule[] = [];

    if (props.isRequired) {
      validationRules.push((value) => !!value || `${props.label} is required`);
    }

    if (props.validationType) {
      switch (props.validationType) {
      case AppValidationTypes.email:
        const emailRegExp =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        validationRules.push(
          (value) =>
            !value ||
              emailRegExp.test(value as string) ||
              'E-mail must be valid'
        );
        break;
      case AppValidationTypes.password:
        validationRules.push(
          (value) =>
            !value ||
              (value as string).trim().length >= 8 ||
              'Password must be at least 8 characters long'
        );
        break;
      case AppValidationTypes.confirmPassword:
        validationRules.push(
          (value) =>
            !value ||
              (value as string).trim().length >= 8 ||
              'Confirm password must be at least 8 characters long and match the  password'
        );
        break;
      default:
        const regExp = FORM_SYMBOLS_VALIDATION[props.validationType];
        if (regExp) {
          validationRules.push(
            (value) =>
              !value ||
                regExp.exp.test(value as string) ||
                `Allowed symbols: ${regExp.text}`
          );
        }
      }
    }

    return validationRules;
  });

  return { validationRules };
};
