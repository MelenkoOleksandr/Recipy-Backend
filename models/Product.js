import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    img: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "ProductCategory"
    },
})

export default model("Product", ProductSchema);