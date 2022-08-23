import { User } from '../classes/user.class';

declare global {
  namespace Express {
    interface Request {
      auth: {
        user?: User;
      };
    }
  }
}
