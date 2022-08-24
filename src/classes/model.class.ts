import { UserAccessTokenType, UserType } from '../types/auth.type';

export class Model<T extends UserType | UserAccessTokenType> {
  public readonly id?: T['id'];

  public readonly created_at?: T['created_at'];
}
