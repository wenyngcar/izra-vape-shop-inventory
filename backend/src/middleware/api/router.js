import express, { query } from "express";
import { checkSchema, validationResult } from 'express-validator'
import * as validateSchema from '../utils/validationSchema.js'
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

router.get("/sales", async (req, res) => {
    try {
        const sales = await database.readSales();
        res.json(sales);
    } catch (error) {
        console.error("Error fetching sales:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Create brand
router.post("/create-brand", checkSchema(validateSchema.createBrandValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

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
router.post("/create-product", checkSchema(validateSchema.createProductValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            console.log("Creating product.");

            console.log(req.body)
            // Date is originally in ISO string format.
            req.body.expiration = new Date(req.body.expiration);

            console.log(req.body)

            await database.createProduct(req.body);
            return res.json(message.success("Succeeded in creating product."));
        }

        console.log("Failed to create product.");
        res.status(400).json(message.failure(result.array()));
    }
);

// Create variant
// NOTE: Unused
router.post("/create-variant", checkSchema(validateSchema.createVariantValidationSchema),
    async (req, res) => {
        const result = validationResult(req);

        if (result.isEmpty()) {
            console.log("Creating variant.");
            await database.createVariant(req.body);
            res.json(message.success("Succeeded in creating variant."));
        }

        console.log("Failed to create variant.");
        res.status(400).json(message.failure(result.array()));
    }
);

router.post("/create-sale", async (req, res) => {
    try {
        await database.createSale(req.body)
        res.json(message.success("Succeeded in creating sale."));
    } catch (error) {
        console.error("Error creating sale:", error);
        res.json(message.failure(error.message));
    }
})


// For deleting item/product
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

//  For editing item/product
router.put("/edit-product", async (req, res) => {
    try {
        req.body.expiration = new Date(req.body.expiration);

        await database.editProductById(req.body)
        return res.json(message.success("Succeeded in editing item."));
    } catch (error) {
        console.error("Error editing product:", error);
        res.json(message.failure(error.message));
    }
})

//  For editing item/product
router.patch("/subtract-quantity", async (req, res) => {
    try {
        await database.editProductById(req.body)
        return res.json(message.success("Succeeded in editing item."));
    } catch (error) {
        console.error("Error editing product:", error);
        res.json(message.failure(error.message));
    }
})


export default router;