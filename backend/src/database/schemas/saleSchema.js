
import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    brandId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    name: String,
    category: String,
    quantity: Number,
    price: Number,
    total: Number,
    Date: Date,
});

export default saleSchema;
