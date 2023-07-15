export type ILoginData = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  access: string;
  refreshToken: string;
};

export type IRefreshTokenResponse = {
  access: string;
};
