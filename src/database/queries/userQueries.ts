import { IResult } from "../../interfaces/result.interface";
import { pool, successObject } from "../database";

// User Queries
// Insert User to Database
export const insertUser = async (
  username: string,
  email: string,
  password: string,
  role: string
): Promise<IResult> => {
  try {
    const query = `INSERT INTO users (username, email, password, role) VALUES (? , ?, ?, ?)`;
    const values = [username, email, password, role];

    await pool.execute(query, values);

    return successObject;
  } catch (error: any) {
    return error;
  }
};

// Get User Id By Username
export const getUserIdByUsername = async (username: string) => {
  try {
    const query = `SELECT id from users WHERE username = ?`;
    const values = [username];

    const [result] = await pool.execute(query, values);
    if (!result) {
      return null;
    }

    return result;
  } catch (error: any) {
    return error;
  }
};

// Admin Queries
// Get All Users in the database
export const getUsers = async () => {
  try {
    const [results] = await pool.query("SELECT * FROM users");
    return results;
  } catch (error) {
    return error;
  }
};
