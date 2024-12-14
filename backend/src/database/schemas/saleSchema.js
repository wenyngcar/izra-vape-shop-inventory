
import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    brandId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    quantity: Number,
    Date: Date,
});

export default saleSchema;
