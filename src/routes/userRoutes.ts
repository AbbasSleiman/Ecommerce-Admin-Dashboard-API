import express, { Request, Response } from "express";
import {
  checkUserExists,
  getUserIdByUsername,
  insertUser,
} from "../database/queries/userQueries";
import { ISession } from "../interfaces/session.interface";

const router = express.Router();

router.get("/check-session", (req: Request, res: Response): any => {
  if (req.session && (req.session as ISession).isLoggedIn) {
    return res.status(200).json({ isLoggedIn: true });
  } else {
    return res.status(401).json({ isLoggedIn: false });
  }
});

router.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password } = req.body;
    const role = "user";

    const result = await insertUser(username, email, password, role);

    if (!result.success) {
      return res.status(400).json({
        message: "Error creating user",
      });
    }
    const user_id = await getUserIdByUsername(username);

    if (user_id === null) {
      return res.status(404).json({ isLoggedIn: false });
    }

    // create session for created user
    (req.session as ISession).username = username;
    (req.session as ISession).userId = user_id;
    (req.session as ISession).isLoggedIn = true;

    return res.status(200).json({ isLoggedIn: true });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, password } = req.body;

    const result = await checkUserExists(username, password);

    console.log(result);
    if (!result.success) {
      return res.status(400).json({
        message: "Error Logging in ",
      });
    }

    const user_id = await getUserIdByUsername(username);

    (req.session as ISession).username = username;
    (req.session as ISession).userId = user_id;
    (req.session as ISession).isLoggedIn = true;

    return res.status(200).json({ isLoggedIn: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", (req: Request, res: Response): any => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout Failed" });
      }

      res.clearCookie("user-session");
      return res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;
