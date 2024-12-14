
import mongoose from "mongoose";

import accountSchema from "../schemas/accountSchema.js";

const Account = mongoose.model("Account", accountSchema);
export default Account;
