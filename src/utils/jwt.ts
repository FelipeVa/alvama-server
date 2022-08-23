import { UserType } from '../types/auth.type';

const jsonwebtoken = require('jsonwebtoken');
const createError = require('http-errors');
const dotenv = require('dotenv');
dotenv.config();

export const jwt = {
  signToken: (payload: string | Buffer | object): Promise<string> => {
    return new Promise((resolve, reject) => {
      jsonwebtoken.sign(
        { payload },
        process.env.ACCESS_TOKEN_SECRET,
        (err: Error | null, token: string | undefined) => {
          if (err) {
            reject(new createError.InternalServerError());
          }

          resolve(token);
        },
      );
    });
  },

  verifyToken: (token: string): Promise<UserType> => {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: Error | null, { payload }: { payload: UserType }) => {
          if (err) {
            const message =
              err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            reject(new createError.Unauthorized(message));
          }

          resolve(payload);
        },
      );
    });
  },
};
