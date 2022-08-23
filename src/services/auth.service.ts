import { LoginType } from '../types/auth.type';
import { jwt } from '../utils/jwt';
import { User } from '../classes/user.class';

const createError = require('http-errors');
const bcrypt = require('bcryptjs');

const service = () => {
  const login = async ({
    email,
    password,
  }: LoginType): Promise<{ accessToken: string; user: User }> => {
    const user = await User.findByEmail(email);

    if (!user) {
      throw new createError.UnprocessableEntity(
        'The provided credentials are incorrect.',
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new createError.UnprocessableEntity(
        'The provided credentials are incorrect.',
      );
    }

    const jwtToken = await jwt.signToken(user);

    const userAccessToken = await user.createAccessToken(jwtToken);

    return {
      accessToken: userAccessToken.token,
      user,
    };
  };

  return { login };
};

export const authService = service();
