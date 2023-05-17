import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
    },
    barcode: {
        type: Array,
        default: []
    },
});

