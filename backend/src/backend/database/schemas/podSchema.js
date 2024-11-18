
import mongoose from "mongoose";

const podSchema = new mongoose.Schema({
    productId: mongoose.ObjectId,
    closedPodId: mongoose.ObjectId,
    flavor: String,
    expirationDate: Date,
});

export default podSchema;
