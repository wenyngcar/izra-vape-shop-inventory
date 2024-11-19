
import mongoose from "mongoose";

const disposableVapeSchema = new mongoose.Schema({
    productId: mongoose.ObjectId,
    flavor: String,
});

export default disposableVapeSchema;
