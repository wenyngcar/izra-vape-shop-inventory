
import express from "express";

import * as database from "./database.js";
import * as message from "../utils/message.js";

const router = express.Router();

// Automatically parses the "req.body" as a JSON object.
router.use(express.json());

router.post("/create-brand", async (req, res) => {
    console.log();
    console.log("Creating brand with the following information:");
    console.log(req.body);
    console.log();

    try {
        await database.createBrand(req.body);
        res.json(message.success("Succeeded in creating brand."));
    } catch (error) {
        res.json(message.failure(error.message));
    }
});

router.post("/create-product", async (req, res) => {
    console.log();
    console.log("Creating product with the following information:");
    console.log(req.body);
    console.log();

    try {
        await database.createProduct(req.body);
        res.json(message.success("Succeeded in creating product."));
    } catch (error) {
        res.json(message.failure(error.message));
    }
});

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

export default router;
