import { QueryResult } from "mysql2";
import { notFoundObject, pool, successObject } from "../database";
import { IResult } from "../../interfaces/results.interface";

// Get All products in the database
export const getOrders = async () => {
  try {
    const [results] = await pool.query("SELECT * FROM orders");
    return results;
  } catch (error) {
    return error;
  }
};

// Get Order By Id
export const getOrderById = async (id: number) => {
  try {
    const [results] = await pool.query(`SELECT * FROM orders WHERE id = ?`, [
      id,
    ]);

    // return Object, not array
    return results[0 as keyof QueryResult];
  } catch (error) {
    return error;
  }
};

// Check if Order Exists by Id
export const checkOrderExists = async (id: number) => {
  try {
    // using prepared statements to safeguard from SQL Injection
    const [results] = await pool.query(`SELECT * FROM orders WHERE id = ?`, [
      id,
    ]);

    if (results[0 as keyof QueryResult] !== undefined || null) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

// Insert Order to Database
export const insertOrder = async (
  userId: number,
  productId: number,
  quantity: number,
  status: string
): Promise<IResult> => {
  try {
    const query = `INSERT INTO Orders (user_id, product_id, quantity, status) VALUES (?, ?, ?, ?)`;
    const values = [userId, productId, quantity, status];

    await pool.execute(query, values);
    return successObject;
  } catch (error: any) {
    return error;
  }
};

// Update Order status in Database
export const updateOrderStatus = async (
  id: number,
  status: string
): Promise<IResult> => {
  try {
    if (await checkOrderExists(id)) {
      const query = "UPDATE `orders` SET `status` = ? WHERE `id` = ?";
      const values = [status, id];

      await pool.execute(query, values);
      return successObject;
    }
    return notFoundObject;
  } catch (error: any) {
    return error;
  }
};

// Delete Product in Database
export const deleteOrderById = async (id: number): Promise<IResult> => {
  try {
    if (await checkOrderExists(id)) {
      const query = "DELETE FROM `orders` WHERE `id` = ?";
      const values = [id];

      await pool.execute(query, values);
      return successObject;
    }
    return notFoundObject;
  } catch (error: any) {
    return error;
  }
};
