import express, { Request, Response } from "express";
import {
  getUserIdByUsername,
  insertUser,
} from "../database/queries/userQueries";
import { ISession } from "../interfaces/session.interface";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password } = req.body;
    const role = "user";

    const result = await insertUser(username, email, password, role);

    if (!result.success) {
      return res.status(400).json({ message: "Error creating user" });
    }
    const user_id = await getUserIdByUsername(username);

    if (user_id === null) {
      return res.status(404).json({ isLoggedIn: false });
    }

    // create session for created user
    (req.session as ISession).username = username;
    (req.session as ISession).email = email;
    (req.session as ISession).userId = user_id;

    return res.status(200).json({ isLoggedIn: true });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/check-session", (req: Request, res: Response) => {
  if (req.session && (req.session as ISession).isLoggedIn) {
  }
});

export default router;
