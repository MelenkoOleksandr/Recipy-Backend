import { Schema, model } from "mongoose";

const ProductCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})

export default model("ProductCategory", ProductCategorySchema);