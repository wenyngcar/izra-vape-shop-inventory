
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
    validator.checkSchema({
        name: {
            errorMessage: "Invalid brand name",
            notEmpty: true,
            escape: true,
        },
        category: {
            errorMessage: "Invalid brand category",
            notEmpty: true,
            escape: true,
        }
    }),
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
router.post("/create-product", 
    validator.checkSchema({
        brandName: {
            errorMessage: "Invalid brand name for product",
            notEmpty: true,
            escape: true,
        },
        brandCategory: {
            errorMessage: "Invalid brand category for product",
            notEmpty: true,
            escape: true,
        },
        variantName: {
            errorMessage: "Invalid variant name for product",
            notEmpty: true,
            escape: true,
        },
        name: {
            errorMessage: "Invalid product name",
            notEmpty: true,
            escape: true,
        },
        price: {
            errorMessage: "Invalid product price",
            notEmpty: true,
            isInt: true,
        },
        quantity: {
            errorMessage: "Invalid product quantity",
            notEmpty: true,
            isInt: true,
        },
        expiration: {   // No validator for checking if Date is in ISO format.
            errorMessage: "Invalid product expiration date",
            notEmpty: true,
            escape: true, 
        },
    }),
    async (req, res) => {
        const result = validator.validationResult(req);

        if (result.isEmpty()) {
            console.log("Creating product.");

            // Date is originally in ISO string format.
            req.body.expiration = new Date(req.body.expiration);

            await database.createProduct(req.body);
            return res.json(message.success("Succeeded in creating product."));
        }

        console.log("Failed to create product.");
        res.status(400).json(message.failure(result.array()));
    }
);

// Create variant
// NOTE: Unused
router.post("/create-variant", 
    validator.checkSchema({
        name: {
            errorMessage: "Invalid variant name",
            notEmpty: true,
            escape: true,
        },
        description: {
            errorMessage: "Invalid variant description",
            notEmpty: true,
            escape: true,
        },
        category: {
            errorMessage: "Invalid variant category",
            notEmpty: true,
            escape: true,
        }
    }),
    async (req, res) => {
        const result = validator.validationResult(req);

        if (result.isEmpty()) {
            console.log("Creating variant.");
            await database.createVariant(req.body);
            res.json(message.success("Succeeded in creating variant."));
        }

        console.log("Failed to create variant.");
        res.status(400).json(message.failure(result.array()));
    }
);

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