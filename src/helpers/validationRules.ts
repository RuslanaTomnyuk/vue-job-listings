export const validationRules = {
  required: (value: any) => !!value || `${value} is required`,
  email: (value: string) => {
    const emailRegExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegExp.test(value) || 'E-mail must be valid';
  },
  password: (value: string) =>
    !value ||
    (value as string).trim().length >= 8 ||
    'Password must be at least 8 characters long',
  confirmPassword: (value: string) =>
    !value ||
    (value as string).trim().length >= 8 ||
    'Confirm password must be at least 8 characters long and match the  password',
};
