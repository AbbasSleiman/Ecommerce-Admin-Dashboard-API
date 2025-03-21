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

export const successObject = {
  success: true,
  message: "Succes",
};

export const notFoundObject = {
  success: false,
  message: "Not Found",
};

export const userAlreadyExists = {
  success: false,
  message: "User already exists",
}