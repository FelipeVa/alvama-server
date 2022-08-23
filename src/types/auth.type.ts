import { User } from '@prisma/client';

export type LoginType = {
  email: string;
  password: string;
};

export type UserType = User;
