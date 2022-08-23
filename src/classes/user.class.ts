import { UserType } from '../types/auth.type';
import { prisma } from '../utils/prisma';

export class User {
  public readonly id?: UserType['id'];

  public readonly name?: UserType['name'];

  public readonly email?: UserType['email'];

  public readonly password?: UserType['password'];

  public readonly created_at?: UserType['created_at'];

  constructor({ id, name, email, password, created_at }: UserType | undefined) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
  }

  static async find(id: number) {
    return new User(
      await prisma.user.findUnique({
        where: {
          id,
        },
      }),
    );
  }

  static async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user ? new User(user) : null;
  }

  async revokeAccessToken(token: string) {
    await prisma.userAccessToken.findFirstOrThrow({
      where: {
        user_id: this.id,
        token,
      },
    });

    await prisma.userAccessToken.deleteMany({
      where: {
        user_id: this.id,
        token,
      },
    });
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
}
