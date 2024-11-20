
import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: String,
    category: String,
});

export default brandSchema;
