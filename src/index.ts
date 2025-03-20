import { config } from "dotenv";
import express, { Request, Response } from "express";

config();

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("test");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
