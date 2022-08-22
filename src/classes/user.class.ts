import { UserType } from '../types/auth.type';
import { prisma } from '../utils/prisma';

export class User {
  public readonly id?: UserType['id'];

  public readonly name?: UserType['name'];

  public readonly email?: UserType['email'];

  public readonly password?: UserType['password'];

  constructor({ id, name, email, password }: UserType | undefined) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  async revokeAccessToken(token: string) {
    await prisma.userAccessToken.deleteMany({
      where: {
        user_id: this.id,
        token,
      },
    });
  }
}
