import { config } from "dotenv";
import express, { Request, Response } from "express";
import session from "express-session";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

config();

const app = express();
const corsOptions = {
  origin: "http://localhost:4200/",
  credentials: true,
};
const port = process.env.PORT;

app.use(
  session({
    secret:
      "7bb899ea88b63227857c3d2b9a7cdc8947010e9af797b303301ff71363c463bd04e12061a2c83c39ad08c665894881ff39c5804be1fd65325ede96418f3d408a", // to be changed for a more secure approach
    name: "user-session",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // for https
      maxAge: 60000 * 60 * 60, // age of cookie
      httpOnly: false, // prevent js access
    },
  })
);

app.use(cors(corsOptions));
app.use(express.json()); // JSON Parser

app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
