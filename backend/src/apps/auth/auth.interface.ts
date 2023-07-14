export type ILoginData = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
