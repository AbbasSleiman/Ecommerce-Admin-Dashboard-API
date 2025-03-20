import { pool } from "../database";

// User Queries

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
