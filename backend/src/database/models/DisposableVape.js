
import mongoose from "mongoose";

import disposableVapeSchema from "../schemas/disposableVapeSchema.js";

const DisposableVape = mongoose.model("DisposableVape", disposableVapeSchema);
export default DisposableVape;
