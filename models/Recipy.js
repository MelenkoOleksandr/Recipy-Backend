import { Schema, model } from "mongoose";

const IngredientSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number
})

const InstructionSchema = new Schema({
    description: String,
    img: String,
})

const CommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text: String,
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
    },
}, { timestamps: true })


const RecipySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    img: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "RecipyCategory"
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    cookingTime: {
        type: Number,
        required: true,
    },
    complexity: {
        type: Number,
        enum: [1, 2, 3],
        required: true,
    },
    ingredients: {
        type: [IngredientSchema],
        required: true,
    },
    instructions: {
        type: [InstructionSchema],
        required: true,
    },
    comments: {
        type: [CommentSchema],
        default: [],
    },
})

export default model("Recipy", RecipySchema);