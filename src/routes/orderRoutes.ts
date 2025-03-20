import express, { Request, Response } from "express";
import {
  deleteOrderById,
  getOrderById,
  getOrders,
  insertOrder,
  updateOrderStatus,
} from "../database/queries/orderQueries";

const router = express.Router();

// Route to get All orders
router.get("/get-orders", async (req: Request, res: Response) => {
  try {
    const result = await getOrders();

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error });
  }
});

// Route to get order by Id
router.get("/get-order-by-id/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await getOrderById(parseInt(id));

    if (result === undefined || null) {
      res.status(404).send({ message: `Order with Id ${id} not Found` });
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ error });
  }
});

// Route to add order
router.post("/add-order", async (req: Request, res: Response) => {
  try {
    const { user_id, product_id, quantity, status } = req.body;

    const result = await insertOrder(user_id, product_id, quantity, status);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: "Unexpected Error " });
  }
});

// Route to update order's status using Id
router.post("/update-order/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await updateOrderStatus(parseInt(id), status);

    if (!result.success) {
      res.status(404).send(result);
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: "Unexpected Error " });
  }
});

// Route to delete order using Id
router.delete("/delete-product/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await deleteOrderById(parseInt(id));

    if (!result.success) {
      res.status(404).send(result);
    }

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: "Unexpected Error" });
  }
});

export default router;
