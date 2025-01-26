import express from "express";
import { checkSchema, validationResult } from 'express-validator';
import { readBrands } from "../api/get.js"
import { createBrand } from "../api/post.js"
import * as message from "../utils/message.js";
import { createBrandValidationSchema } from "../utils/validationSchema.js";
import { deleteBrandById } from "../api/delete.js";

const router = express.Router();

// Automatically parses the "req.body" as a JSON object.
router.use(express.json());

// Router for fetching all brands.
router.get("/brands", async (_, res) => {
  try {
    const filter = {};
    const brands = await readBrands(filter);
    res.json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    res.status(500).json({ error: error.message });
  }
})

// Create brand
router.post("/create-brand", checkSchema(createBrandValidationSchema),
  async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      console.log("Creating brand.");
      await createBrand(req.body);
      return res.json(message.success("Succeeded in creating brand."));
    }

    console.log("Failed to create brand.");
    res.status(400).json(message.failure(result.array()));
  }
);

// For deleting brand.
router.delete("/delete-brand", async (req, res) => {
  try {
    const _id = req.query

    // Check if there are id pass in the query parameters.
    if (!_id) return res.json(message.failure("Brand ID (_id) is requried."))

    await deleteBrandById(_id)
    res.json(message.success(`Brand with ID ${JSON.stringify(_id)} successfully deleted.`));
  } catch (error) {
    console.error("Error deleting brand:", error);
    res.json(message.failure(error.message));
  }
})

export default router
