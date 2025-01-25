import express from "express";
import { checkSchema, validationResult } from 'express-validator';
import { createAccount, verifyAccount } from "../api/account.js";
import * as message from "../utils/message.js";
import { accountValidationSchema } from "../utils/validationSchema.js";

const router = express.Router();

// Automatically parses the "req.body" as a JSON object.
router.use(express.json());

router.post("/sign-up", checkSchema(accountValidationSchema),
  async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      console.log("Creating account.");
      await createAccount(req.body);
      return res.json(message.success("Succeeded in creating account."));
    }

    console.log("Failed to create account.");
    res.status(400).json(message.failure(result.array()));
  }
)

router.post("/login", checkSchema(accountValidationSchema),
  async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
      console.log("Verfying account credentials.");
      const isValid = await verifyAccount(req.body);
      return res.json(message.success(isValid));
    }

    console.log("Failed to verify account.");
    res.status(400).json(message.failure(result.array()));
  }
);

export default router;
