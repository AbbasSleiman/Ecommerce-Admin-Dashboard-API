import { QueryResult, RowDataPacket } from "mysql2";
import { pool, successObject } from "../database";

// Get All products in the database
export const getProducts = async () => {
  try {
    const [results] = await pool.query("SELECT * FROM products");
    return results;
  } catch (error) {
    return error;
  }
};

// Get Product By Name
export const getProductByName = async (name: string) => {
  try {
    // using prepared statements to safeguard from SQL Injection
    const [results] = await pool.query(
      `SELECT * FROM products WHERE name = ?`,
      [name]
    );

    // return Object, not array
    return results[0 as keyof QueryResult];
  } catch (error) {
    return error;
  }
};

// Get Product By Id
export const getProductById = async (id: number) => {
  try {
    // using prepared statements to safeguard from SQL Injection
    const [results] = await pool.query(`SELECT * FROM products WHERE id = ?`, [
      id,
    ]);

    // return Object, not array
    return results[0 as keyof QueryResult];
  } catch (error) {
    return error;
  }
};

// Insert Product to Database
export const insertProduct = async (
  name: string,
  category: string,
  price: string
) => {
  try {
    const query = `INSERT INTO products (name, category, price) VALUES (? , ?, ?)`;
    const values = [name, category, price];

    await pool.execute(query, values);
    return successObject;
  } catch (error) {
    return error;
  }
};

// Update Product in Database
export const updateProduct = async (
  id: number,
  name: string,
  category: string,
  price: string
) => {
  try {
    const query =
      "UPDATE `products` SET `name` = ?, `category` = ?, `price` = ? WHERE `id` = ?";
    const values = [name, category, price, id];

    await pool.execute(query, values);
    return successObject;
  } catch (error) {
    return error;
  }
};

// Delete Product in Database
export const deleteProductById = async (id: number) => {
  try {
    const query = "DELETE FROM `products` WHERE `id` = ?";
    const values = [id];

    await pool.execute(query, values);
    return successObject;
  } catch (error) {
    return error;
  }
};
