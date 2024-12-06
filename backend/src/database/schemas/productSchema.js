
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    brandId: mongoose.Types.ObjectId,
    variantId: mongoose.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    expiration: Date,
});

export default productSchema;
