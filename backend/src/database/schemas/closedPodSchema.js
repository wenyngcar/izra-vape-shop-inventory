
import mongoose from "mongoose";

const closedPodSchema = new mongoose.Schema({
    productId: mongoose.ObjectId,
});

export default closedPodSchema;
