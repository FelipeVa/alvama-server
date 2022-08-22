import { LoginType, UserType } from '../types/auth.type';
import { prisma } from '../utils/prisma';
import { jwt } from '../utils/jwt';

const createError = require('http-errors');
const bcrypt = require('bcryptjs');

const service = () => {
  const login = async ({
    email,
    password,
  }: LoginType): Promise<{ accessToken: string; user: UserType }> => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new createError.NotFound('User with given credentials not found');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new createError.Unauthorized('User credentials are invalid');
    }

    const jwtToken = await jwt.signToken(user);

    const userAccessToken = await prisma.userAccessToken.create({
      data: {
        user_id: user.id,
        name: `${user.name} Access Token ${Date.now()}`,
        token: jwtToken,
      },
    });

    return {
      accessToken: userAccessToken.token,
      user,
    };
  };

  return { login };
};

export const authService = service();
