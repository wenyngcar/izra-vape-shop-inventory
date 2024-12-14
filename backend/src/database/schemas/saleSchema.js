
import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    productId: mongoose.Types.ObjectId,
    quantity: Number,
    Date: Date,
});

export default saleSchema;
