import { Schema, model } from "mongoose";

const FridgeProductSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number
})

const UserSchema = new Schema({
    img: String,
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    fridge: {
        type: [FridgeProductSchema],
        default: []
    },
    savedRecipies: {
        type: [Schema.Types.ObjectId],
        ref: "Recipy",
        default: []
    },
}, { timestamps: true })

export default model("User", UserSchema);