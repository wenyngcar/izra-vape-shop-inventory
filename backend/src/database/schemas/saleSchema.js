
import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    productId: mongoose.ObjectId,
    quantity: Number,
    Date: Date,
});

export default saleSchema;
