import { AppValidationTypes } from '@/interfaces/enums';

export const FORM_FIELDS = {
  FIRST_NAME: 'userName',
  // E_MAIL: 'email',
  // PASSWORD: 'password',
  // CONFIRM_PASSWORD: 'confirmPassword',
};

export const FORM_SYMBOLS_VALIDATION: Record<
  string,
  { exp: RegExp; text: string }
> = {
  [AppValidationTypes.firstName]: {
    exp: /^([A-zÀ-ž'\s-])+$/,
    text: '\' -',
  },
};
