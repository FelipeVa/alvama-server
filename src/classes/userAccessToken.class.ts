import { UserAccessTokenType } from '../types/auth.type';
import { prisma } from '../utils/prisma';
import { Model } from './model.class';

const createError = require('http-errors');

export class UserAccessToken extends Model<UserAccessTokenType> {
  public readonly id?: UserAccessTokenType['id'];

  public readonly name?: UserAccessTokenType['name'];

  public readonly token?: UserAccessTokenType['token'];

  public readonly created_at?: UserAccessTokenType['created_at'];

  constructor({
    id,
    name,
    token,
    created_at,
  }: UserAccessTokenType | undefined) {
    super();
    this.id = id;
    this.name = name;
    this.token = token;
    this.created_at = created_at;
  }

  static async findFromUser(token: string, userId: number) {
    const accessToken = await prisma.userAccessToken.findFirst({
      where: {
        user_id: userId,
        token,
      },
    });

    return accessToken ? new UserAccessToken(accessToken) : null;
  }

  static async findFromUserOrFail(token: string, userId: number) {
    const accessToken = await UserAccessToken.findFromUser(token, userId);

    if (!accessToken) {
      throw new createError.NotFound('Token not found');
    }

    return accessToken ? accessToken : null;
  }

  static async find(id: number) {
    const accessToken = await prisma.userAccessToken.findUnique({
      where: {
        id,
      },
    });

    return accessToken ? new UserAccessToken(accessToken) : null;
  }

  static async delete(value: string | number) {
    const removable =
      typeof value === 'string'
        ? {
            token: value,
          }
        : {
            id: value,
          };

    await prisma.userAccessToken.deleteMany({
      where: removable,
    });
  }

  async delete() {
    await UserAccessToken.delete(this.id);
  }
}
