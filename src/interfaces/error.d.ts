interface AppError extends Error {
  code?: number | string;
  response?: {
    status: number;
    data?: {
      message: string;
    };
  };
}
