export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const GOOGLE_WEB_CLIENT_ID =
  '361093114481-hc1tko11uhh8fjgs8uk6gg5cg9u802gd.apps.googleusercontent.com';

export const TOKEN_KEY = '@auth_token';
export const USER_KEY = '@auth_user';
