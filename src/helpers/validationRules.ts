export const validateRules = {
  required: (value: any) => !!value || `${value} is required`,
  name: (value: string) => !value ||
      (value as string).trim().length <= 3 ||
      'Name must be at least 3 characters long',
  email: (value: string) => {
    const emailRegExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegExp.test(value) || 'E-mail must be valid';
  },
  password: (value: string) => {
    const containsUpperCase = /[A-Z]/.test(value);
    const containsLowerCase = /[a-z]/.test(value);
    const containsNumber = /[0-9]/.test(value);
    const containsSpecial = /[#?!@$%^&*-]/.test(value);
    return (
      (containsUpperCase &&
        containsLowerCase &&
        containsNumber &&
        containsSpecial) ||
      !value ||
      (value as string).trim().length >= 8 ||
      'Password must be at least 8 characters long'
    );
  },
  confirmPassword: (value: string) =>
    !value ||
    (value as string).trim().length >= 8 ||
    'Confirm password must be at least 8 characters long and match the  password',
};

export const validationRules = (label: string) => {
  return [
    (value: any) => !!value || `${label} is required`,
    (value: string) =>
      label === 'Name' &&
      (!value ||
        (value as string).trim().length >= 3 ||
        `${label} must be at least 3 characters long`),
    (value: string) => {
      const emailRegExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return (
        label === 'Email' &&
        (emailRegExp.test(value) || `${label} must be valid`)
      );
    },
    (value: string) =>
      label === 'Password' &&
      (!value ||
        (value as string).trim().length >= 8 ||
        `${label} must be at least 8 characters long`),
    (value: string) =>
      label === 'Current Password' &&
      (!value ||
        (value as string).trim().length >= 8 ||
        `${label} must be at least 8 characters long`),
    (value: string) =>
      label === 'New Password' &&
      (!value ||
        (value as string).trim().length >= 8 ||
        `${label} must be at least 8 characters long`),
    (value: string) =>
      label === 'Confirm New Password' &&
      (!value ||
        (value as string).trim().length >= 8 ||
        `${label} must be at least 8 characters long and match the password`),
  ];
};
