import express from "express";
import brandRouter from "./brandRouter.js";
import loginRouter from "./loginRouter.js";
import productRouter from "./productRouter.js";
import salesRouter from "./salesRouter.js";

const router = express.Router();

// Automatically parses the "req.body" as a JSON object.
router.use(brandRouter)
router.use(productRouter)
router.use(salesRouter)
router.use(loginRouter)

// Create variant
// router.post("/create-variant", checkSchema(validateSchema.createVariantValidationSchema),
//   async (req, res) => {
//     const result = validationResult(req);
//
//     if (result.isEmpty()) {
//       console.log("Creating variant.");
//       await database.createVariant(req.body);
//       res.json(message.success("Succeeded in creating variant."));
//     }
//
//     console.log("Failed to create variant.");
//     res.status(400).json(message.failure(result.array()));
//   }
// );

export default router;
