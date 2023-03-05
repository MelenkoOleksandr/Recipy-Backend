import { Schema, model } from "mongoose";

const RecipyCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})

export default model("RecipyCategory", RecipyCategorySchema);