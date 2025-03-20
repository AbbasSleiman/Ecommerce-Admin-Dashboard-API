import { QueryResult } from "mysql2";
import { notFoundObject, pool, successObject } from "../database";
import { IResult } from "../../interfaces/results.interface";

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
    console.log(results[0 as keyof QueryResult]);
    return results[0 as keyof QueryResult];
  } catch (error) {
    return error;
  }
};

// Check if Product Exists by Id
export const checkProductExists = async (id: number) => {
  try {
    // using prepared statements to safeguard from SQL Injection
    const [results] = await pool.query(`SELECT * FROM products WHERE id = ?`, [
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

// Insert Product to Database
export const insertProduct = async (
  name: string,
  category: string,
  price: string
): Promise<IResult> => {
  try {
    const query = `INSERT INTO products (name, category, price) VALUES (? , ?, ?)`;
    const values = [name, category, price];

    await pool.execute(query, values);

    return successObject;
  } catch (error: any) {
    return error;
  }
};

// Update Product in Database
export const updateProduct = async (
  id: number,
  name: string,
  category: string,
  price: string
): Promise<IResult> => {
  try {
    if (await checkProductExists(id)) {
      const query =
        "UPDATE `products` SET `name` = ?, `category` = ?, `price` = ? WHERE `id` = ?";
      const values = [name, category, price, id];

      await pool.execute(query, values);
      return successObject;
    }
    return notFoundObject;
  } catch (error: any) {
    return error;
  }
};

// Delete Product in Database
export const deleteProductById = async (id: number): Promise<IResult> => {
  try {
    if (await checkProductExists(id)) {
      const query = "DELETE FROM `products` WHERE `id` = ?";
      const values = [id];

      await pool.execute(query, values);
      return successObject;
    }
    return notFoundObject;
  } catch (error: any) {
    return error;
  }
};
