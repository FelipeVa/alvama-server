import { UserType } from '../types/auth.type';
import { prisma } from '../utils/prisma';
import { jwt } from '../utils/jwt';
import { Model } from './model.class';
import { UserAccessToken } from './userAccessToken.class';

const createError = require('http-errors');

export class User extends Model<UserType> {
  public readonly id?: UserType['id'];

  public readonly name?: UserType['name'];

  public readonly email?: UserType['email'];

  public password?: UserType['password'];

  public readonly created_at?: UserType['created_at'];

  constructor({ id, name, email, password, created_at }: UserType | undefined) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
  }

  static async find(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user ? new User(user) : null;
  }

  static async findOrFail(id: number) {
    const user = await User.find(id);

    if (!user) {
      throw new createError.NotFound('User not found');
    }

    return user ? user : null;
  }

  static async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user ? new User(user) : null;
  }

  static async fromJwt(token: string) {
    try {
      const isValidToken = await jwt.verifyToken(token);

      return await User.findOrFail(isValidToken.id);
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }

  async revokeAccessToken(token: string) {
    try {
      const accessToken = await UserAccessToken.findFromUserOrFail(
        token,
        this.id,
      );

      await accessToken.delete();
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }

  async createAccessToken(token: string) {
    return await prisma.userAccessToken.create({
      data: {
        name: `${this.name} Access Token ${Date.now()}`,
        user_id: this.id,
        token,
      },
    });
  }

  async verifyAccessToken(token: string) {
    try {
      await jwt.verifyToken(token);

      return await UserAccessToken.findFromUserOrFail(token, this.id);
    } catch (error) {
      throw createError(error.statusCode, error.message);
    }
  }
}
