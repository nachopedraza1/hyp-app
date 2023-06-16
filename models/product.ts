import { Product } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

export interface IProduct extends Product { }

const productSchema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    sizes: { type: Array, required: true },
    stock: { type: Number, required: true }
});

const productModel: Model<IProduct> = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productModel;


