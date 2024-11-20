
import mongoose from "mongoose";

import saleSchema from "../schemas/saleSchema.js";

const Sale = mongoose.model("Sale", saleSchema);
export default Sale;
