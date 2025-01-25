import express from "express";
import { createSale, deleteSalesById, readSales } from "../api/database.js";
import * as message from "../utils/message.js";

const router = express.Router();

// Automatically parses the "req.body" as a JSON object.
router.use(express.json());

// Router for fetching all sales.
router.get("/sales", async (req, res) => {
  try {
    const sales = await readSales();
    res.json(sales);
  } catch (error) {
    console.error("Error fetching sales:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Router for creating sales.
router.post("/create-sale", async (req, res) => {
  try {
    await createSale(req.body)
    res.json(message.success("Succeeded in creating sale."));
  } catch (error) {
    console.error("Error creating sale:", error);
    res.json(message.failure(error.message));
  }
})

// For deleting sales
router.delete("/delete-sales", async (req, res) => {
  try {
    const _id = req.query

    // Check if there are id pass in the query parameters.
    if (!_id) return res.json(message.failure("Sale ID (_id) is requried."))

    await deleteSalesById(_id)
    res.json(message.success(`Product with ID ${JSON.stringify(_id)} successfully deleted.`));
  } catch (error) {
    console.error("Error deleting product:", error);
    res.json(message.failure(error.message));
  }
})

export default router
