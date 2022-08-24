import { User, UserAccessToken } from '@prisma/client';

export type LoginType = {
  email: string;
  password: string;
};

export type UserType = User;
export type UserAccessTokenType = UserAccessToken;
