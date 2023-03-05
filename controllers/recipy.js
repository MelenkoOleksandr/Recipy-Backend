import Recipy from '../models/Recipy.js'
import Product from '../models/Product.js'
import User from '../models/User.js'

export const getRecipies = async (req, res, next) => {
    try {
        const recipies = await Recipy.find()
        const recipiesWithUserAndProducts = await Promise.all(recipies.map(async (recipy) => {
            const user = await User.findById(recipy.userId)
            const ingredientsWithQuantity = await Promise.all(recipy.ingredients.map(async (ingredient) => {
                const product = await Product.findById(ingredient.productId)
                return {
                    ...product._doc,
                    quantity: ingredient.quantity
                }
            }))

            return {
                ...recipy._doc,
                user,
                ingredients: ingredientsWithQuantity
            }
        }))
        res.status(200).json(recipiesWithUserAndProducts)
    } catch (error) {
        next(error)
    }
}

export const getRecipy = async (req, res, next) => {
    try {
        const recipy = await Recipy.findById(req.params.id)
        const recipyUser = await User.findById(recipy.userId)
        const recipyIngredients = await Promise.all(recipy.ingredients.map(async (ingredient) => {
            const product = await Product.findById(ingredient.productId)
            return {
                ...product._doc,
                quantity: ingredient.quantity
            }
        }))

        const recipyWithUser = {
            ...recipy._doc,
            user: recipyUser,
            ingredients: recipyIngredients
        }

        res.status(200).json(recipyWithUser)
    } catch (error) {
        next(error)
    }
}

export const createRecipy = async (req, res, next) => {
    try {
        const newRecipy = await Recipy.create(req.body)
        res.status(201).json(newRecipy)
    } catch (error) {
        next(error)
    }
}

export const updateRecipy = async (req, res, next) => {
    try {
        const updatedRecipy = await Recipy.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedRecipy)
    } catch (error) {
        next(error)
    }
}

export const deleteRecipy = async (req, res, next) => {
    try {
        await Recipy.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Recipy has been deleted" })
    } catch (error) {
        next(error)
    }
}
