import { pool } from "../database";

// Get All products in the database
export const getOrders = async () => {
  try {
    const [results] = await pool.query("SELECT * FROM orders");
    return results;
  } catch (error) {
    return error;
  }
};
