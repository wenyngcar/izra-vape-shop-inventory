
import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
});

export default variantSchema;
