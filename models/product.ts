import { Product } from "@/interfaces";

import mongoose, { Schema, Model } from "mongoose";


const productSchema = new Schema({
    description: { type: String, required: true },
    images: [{ type: String }],
    inStock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    sizes: [{
        type: String,
        enum: {
            values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            message: '{VALUE} No es tu tamaño permitido. '
        }
    }],
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    type: {
        type: String,
        enum: {
            values: ['shirts', 'pants', 'hoodies', 'hats'],
            message: '{VALUE} No es un tipo permitido. '
        }
    },
}, { timestamps: true });

productSchema.index({ title: 'text', tags: 'text' });

const Product: Model<Product> = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;

