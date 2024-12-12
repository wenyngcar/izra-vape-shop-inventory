import mongoose from "mongoose";
import adminSchema from "../schemas/adminSchema";

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
