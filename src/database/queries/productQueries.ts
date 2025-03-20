import { pool } from "../database";

// Get All products in the database
export const getProducts = async () => {
  try {
    const [results] = await pool.query("SELECT * FROM products");
    return results;
  } catch (error) {
    return error;
  }
};
