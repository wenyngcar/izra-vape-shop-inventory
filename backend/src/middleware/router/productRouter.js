import express from "express";
import { checkSchema, validationResult } from 'express-validator';
import { readProducts } from "../api/get.js";
import { createProduct } from "../api/post.js"
import { deleteProductById } from "../api/delete.js"
import { editProductById } from "../api/edit.js"
import * as message from "../utils/message.js";
import { createProductValidationSchema } from "../utils/validationSchema.js";

const router = express.Router();

// Automatically parses the "req.body" as a JSON object.
router.use(express.json());

// Fetch products by id.
router.get("/products", async (req, res) => {
  try {
    const filter = {};
    if (req.query.brandId) filter.brandId = req.query.brandId; // Optional query param
    const products = await readProducts(filter);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: error.message });
  }
})

// Create product
router.post("/create-product", checkSchema(createProductValidationSchema),
  async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      console.log("Creating product.");

      console.log(req.body)
      // Date is originally in ISO string format.
      req.body.expiration = new Date(req.body.expiration);

      console.log(req.body)

      await createProduct(req.body);
      return res.json(message.success("Succeeded in creating product."));
    }

    console.log("Failed to create product.");
    res.status(400).json(message.failure(result.array()));
  }
);

// For deleting item/product
router.delete("/delete-product", async (req, res) => {
  try {
    const _id = req.query

    // Check if there are id pass in the query parameters.
    if (!_id) return res.json(message.failure("Product ID (_id) is requried."))

    await deleteProductById(_id)
    res.json(message.success(`Product with ID ${JSON.stringify(_id)} successfully deleted.`));
  } catch (error) {
    console.error("Error deleting product:", error);
    res.json(message.failure(error.message));
  }
})

//  For editing item/product
router.patch("/edit-product", async (req, res) => {
  try {
    await editProductById(req.body)
    return res.json(message.success("Succeeded in editing item."));
  } catch (error) {
    console.error("Error editing product:", error);
    res.json(message.failure(error.message));
  }
})

//  For editing item/product
router.patch("/subtract-quantity", async (req, res) => {
  try {
    await editProductById(req.body)
    return res.json(message.success("Succeeded in editing item."));
  } catch (error) {
    console.error("Error editing product:", error);
    res.json(message.failure(error.message));
  }
})

export default router
