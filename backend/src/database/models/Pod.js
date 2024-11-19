
import mongoose from "mongoose";

import podSchema from "../schemas/podSchema.js";

const Pod = mongoose.model("Pod", podSchema);
export default Pod;
