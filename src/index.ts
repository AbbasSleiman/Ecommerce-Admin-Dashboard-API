import { config } from "dotenv";
import express, { Request, Response } from "express";
import {
  getProductByName,
  insertProduct,
  updateProduct,
  deleteProductById,
} from "./database/queries/productQueries";

config();

const app = express();
const port = process.env.PORT;

app.get("/", async (req: Request, res: Response) => {
  try {
    const value = await getProductByName("Laptop");
    console.log(value);
    res.send(value);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
