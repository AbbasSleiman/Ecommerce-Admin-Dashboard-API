import { config } from "dotenv";
import mysql from "mysql2";

config();


// pool of connections
export const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  .promise();

export const getUsers = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    console.log(rows);
    return rows;
  } catch (error) {
    return error;
  }
};
