
import mongoose from "mongoose";

import variantSchema from "../schemas/variantSchema.js";

const Variant = mongoose.model("Variant", variantSchema);
export default Variant;
