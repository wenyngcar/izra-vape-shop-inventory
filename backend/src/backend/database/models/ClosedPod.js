
import mongoose from "mongoose";

import closedPodSchema from "../schemas/closedPodSchema.js";

const ClosedPod = mongoose.model("ClosedPod", closedPodSchema);
export default ClosedPod;
