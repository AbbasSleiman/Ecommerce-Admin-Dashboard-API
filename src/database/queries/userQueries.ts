import { QueryResult } from "mysql2";
import { IResult } from "../../interfaces/result.interface";
import {
  notFoundObject,
  pool,
  successObject,
  userAlreadyExists,
} from "../database";

// User Queries
// Insert User to Database
export const insertUser = async (
  username: string,
  email: string,
  password: string,
  role: string
): Promise<IResult> => {
  try {
    const [result] = await getUserIdByUsername(username);

    console.log(result);

    if (result) {
      console.log("er");
      return userAlreadyExists;
    }

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

// Check if User exists using username and password
export const checkUserExists = async (
  username: string,
  password: string
): Promise<IResult> => {
  try {
    const query = `SELECT id FROM users WHERE username = ? AND password = ? `;
    const values = [username, password];

    const [result] = await pool.execute(query, values);

    // check if there's an object inside of the result array
    if (result[0 as keyof QueryResult]) {
      return successObject;
    }

    return notFoundObject;
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
