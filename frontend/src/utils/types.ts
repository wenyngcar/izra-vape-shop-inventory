import mongoose from "mongoose";

// For data component that only needs brand id as props.
export type BrandId = {
  brandId: mongoose.Types.ObjectId
}

// Types here shuold match the field name in the database.
export type Brands = {
  _id: mongoose.Types.ObjectId;
  name: string;
  category: "E-liquid" | "Device";
};

export type Items = {
  id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  date: Date;
};

export type Sales = {
  id: mongoose.Types.ObjectId;
  brandId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
  date: Date;
};
