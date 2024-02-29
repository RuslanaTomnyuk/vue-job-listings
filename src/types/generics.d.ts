export type AppField<P> = Partial<VTextField> & {
  key: keyof P;
  isDisabled?: boolean;
  isRequired?: boolean;
  items?: Record<string, string | number>[];
  inputData: string;
  isEditTab?: boolean;
  isChangePasswordTab?: boolean;
};
