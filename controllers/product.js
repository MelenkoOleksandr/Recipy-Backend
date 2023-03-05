import Product from '../models/Product.js'
import User from '../models/User.js'

export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body)
        res.status(201).json(newProduct)
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedProduct)
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Product has been deleted" })
    } catch (error) {
        next(error)
    }
}

export const getProductsInFridge = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const products = await Promise.all(user.fridge.map(async (item) => {
            const product = await Product.findOne({ _id: item.productId })
            return {
                ...product._doc,
                quantity: item.quantity
            }
        }))
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

export const addProductToFridge = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.userId, {
            $addToSet: { fridge: req.body }
        }, { new: true })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const removeProductFromFridge = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.userId, {
            $pull: {
                fridge:
                    { productId: req.params.id }
            }
        }, { new: true })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const updateProductInFridge = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const fridge = user.fridge.map((item) => {
            console.log(item.productId.toString(), req.params.id)
            if (item.productId.toString() === req.params.id) {
                return {
                    ...item._doc,
                    quantity: req.body.quantity
                }
            }
            return item
        })
        user.fridge = fridge

        await user.save()
        res.status(200).json("Product has been updated")
    } catch (error) {
        next(error)
    }
}