
import express from "express";

import * as utils from "./utils.js";

const router = express.Router();

// Automatically parses the "req.body" as a JSON object.
router.use(express.json());

router.post("/create-brand", async (req, res) => {
    try {
        await utils.createBrand(req.body);
        res.json(utils.success("Succeeded in creating brand."));
    } catch (error) {
        res.json(utils.failure(error.message));
    }
});

router.post("/create-closed-pod", async (req, res) => {
    try {
        await utils.createClosedPod(req.body);
        res.json(utils.success("Succeeded in creating closed pod."));
    } catch (error) {
        res.json(utils.failure(error.message));
    }
});

router.post("/create-disposable-vape", async (req, res) => {
    try {
        await utils.createDisposableVape(req.body);
        res.json(utils.success("Succeeded in creating disposable vape."));
    } catch (error) {
        res.json(utils.failure(error.message));
    }
});

router.post("/create-pod", async (req, res) => {
    try {
        await utils.createPod(req.body);
        res.json(utils.success("Succeeded in creating pod."));
    } catch (error) {
        res.json(utils.failure(error.message));
    }
});

router.post("/create-product", async (req, res) => {
    try {
        await utils.createProduct(req.body);
        res.json(utils.success("Succeeded in creating product."));
    } catch (error) {
        res.json(utils.failure(error.message));
    }
});

export default router;
