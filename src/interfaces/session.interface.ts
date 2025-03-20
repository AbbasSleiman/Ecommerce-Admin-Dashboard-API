import { Session } from "express-session";

export interface ISession extends Session {
  userId?: number;
  username?: string;
  email?: string;
  isLoggedIn?: boolean;
  role?: string;
}
