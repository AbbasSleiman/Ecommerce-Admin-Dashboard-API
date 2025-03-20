import { config } from "dotenv";
import express, { Request, Response } from "express";
import productRoutes from "./routes/productRoutes";

config();

const app = express();
const port = process.env.PORT;

app.use(express.json()); // JSON Parser

app.use("/product", productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
