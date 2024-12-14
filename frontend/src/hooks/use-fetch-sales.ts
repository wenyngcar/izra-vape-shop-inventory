import { readSales } from "@/utils/api";
import mongoose from "mongoose";

type LocalSales = {
_id: mongoose.Types.ObjectId;
brandId: mongoose.Types.ObjectId;
productId: mongoose.Types.ObjectId;
name: string;
category: string;
quantity: number;
price: number;
total: number;
date: Date;
};

export async function UseFetchSales(
brandId: mongoose.Types.ObjectId
): Promise<LocalSales[]> {
try {
    const data = await readSales({ brandId });
    return data.map((sale: LocalSales) => ({
    id: sale._id.toString(),
    brandId: sale.brandId,
    productId: sale.productId,
    name: sale.name,
    category: sale.category,
    quantity: sale.quantity,
    price: sale.price,
    total: sale.quantity * sale.price, // Calculate total on the fly
    date: new Date(sale.date),
    }));
} catch (error) {
    console.error("Error fetching sales:", error);
    return [];
}
}
