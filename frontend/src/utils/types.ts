import mongoose from "mongoose";

// For data component that only needs brand id as props.

export interface MongooseId {
  _id: mongoose.Types.ObjectId
}

// Types here shuold match the field name in the database.
export interface Brands extends MongooseId {
  name: string;
  category: "E-liquid" | "Device";
};

export interface Items extends MongooseId {
  name: string;
  price: number;
  quantity: number;
  date: Date;
};

export interface Sales extends Items, Brands {
  brandId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  total: number;
};
