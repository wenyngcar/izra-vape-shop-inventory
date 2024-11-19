
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    brandId: mongoose.ObjectId,
    variantId: mongoose.ObjectId,
    name: String,
    price: Number,
    quantity: Number,
});

export default productSchema;
