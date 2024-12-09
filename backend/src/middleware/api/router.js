
import express from "express";
import * as validator from "express-validator";

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
router.post("/create-brand", 
    validator.body("name").notEmpty().escape(),
    validator.body("category").notEmpty().escape(),
    async (req, res) => {
        const result = validator.validationResult(req);
        
        if (result.isEmpty()) {
            console.log("Creating brand.");
            await database.createBrand(req.body);
            return res.json(message.success("Succeeded in creating brand."));
        }

        console.log("Failed to create brand.");
        res.status(400).json(message.failure(result.array()));
    }
);

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
    const filter = {}
    try {
        if (req.query.prodctId) filter.prodctId = req.query.prodctId
        await database.deleteProductById(filter)
        res.json(message.success(`${req.body} product successfully deleted`))
    } catch (error) {
        res.json(message.failure(error.message));
    }
})

export default router;