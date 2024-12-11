
import express from "express";

import * as database from "./database.js";
import * as message from "../utils/message.js";

const router = express.Router();

// Automatically parses the "req.body" as a JSON object.
router.use(express.json());

// Router for fetching all brands.
router.get("/brands", async (_, res) => {
    try {
        const filter = {};
        const brands = await database.readBrands(filter);
        res.json(brands);
    } catch (error) {
        console.error("Error fetching brands:", error.message);
        res.status(500).json({ error: error.message });
    }
})

// Fetch products by id.
router.get("/products", async (req, res) => {
    try {
        const filter = {};
        if (req.query.brandId) filter.brandId = req.query.brandId; // Optional query param
        const products = await database.readProducts(filter);
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ error: error.message });
    }
})

// Create brand
router.post("/create-brand", async (req, res) => {
    console.log("\nCreating brand with the following information:");
    console.log(`${req.body}\n`);

    try {
        await database.createBrand(req.body);
        res.json(message.success("Succeeded in creating brand."));
    } catch (error) {
        res.json(message.failure(error.message));
    }
});

// Create product
router.post("/create-product", async (req, res) => {
    console.log("\nCreating product with the following information:");
    console.log(`${req.body}\n`);

    try {
        await database.createProduct(req.body);
        res.json(message.success("Succeeded in creating product."));
    } catch (error) {
        res.json(message.failure(error.message));
    }
});

// Create variant
// NOTE: Unused
router.post("/create-variant", async (req, res) => {
    console.log();
    console.log("Creating variant with the following information:");
    console.log(req.body);
    console.log();

    try {
        await database.createVariant(req.body);
        res.json(message.success("Succeeded in creating variant."));
    } catch (error) {
        res.json(message.failure(error.message));
    }
});

router.delete("/delete-product", async (req, res) => {
    try {
        const _id = req.query

        // Check if there are id pass in the query parameters.
        if (!_id) return res.json(message.failure("Product ID (_id) is requried."))

        await database.deleteProductById(_id)
        res.json(message.success(`Product with ID ${JSON.stringify(_id)} successfully deleted.`));
    } catch (error) {
        console.error("Error deleting product:", error);
        res.json(message.failure(error.message));
    }
})

export default router;