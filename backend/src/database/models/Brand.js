
import mongoose from "mongoose";

import brandSchema from "../schemas/brandSchema.js";

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
