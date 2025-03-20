import express, { Request, Response } from "express";
import {
  deleteProductById,
  getProductById,
  getProductByName,
  getProducts,
  insertProduct,
  updateProduct,
} from "../database/queries/productQueries";

const router = express.Router();

// Route to get All products
router.get("/get-products", async (req: Request, res: Response) => {
  try {
    const result = await getProducts();

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error });
  }
});

// Route to get product by Id
router.get("/get-product-by-id/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await getProductById(parseInt(id));

    if (result === undefined || null) {
      res.status(404).send({ message: `Product with Id ${id} not Found` });
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error });
  }
});

// Route to get product by Id
router.get(
  "/get-product-by-name/:name",
  async (req: Request, res: Response) => {
    try {
      const { name } = req.params;

      const result = await getProductByName(name);

      if (result === undefined || null) {
        res.status(404).send({ message: `Product with Id ${name} not Found` });
      }

      res.status(200).send(result);
    } catch (error) {
      res.status(400).send({ error });
    }
  }
);

// Route to add product
router.post("/add-product", async (req: Request, res: Response) => {
  try {
    const { name, category, price } = req.body;

    const result = await insertProduct(name, category, price);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: "Unexpected Error " });
  }
});

// Route to update product using Id
router.put("/update-product/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, price } = req.body;

    const result = await updateProduct(parseInt(id), name, category, price);

    if (result === undefined || null || false) {
      res.status(404).send(result);
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: "Unexpected Error " });
  }
});

// Route to delete product using Id
router.delete("/delete-product/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await deleteProductById(parseInt(id));

    if (!result.success) {
      res.status(404).send(result);
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: "Unexpected Error" });
  }
});
export default router;
