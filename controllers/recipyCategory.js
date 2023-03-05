import RecipyCategory from '../models/RecipyCategory.js'

export const getRecipyCategories = async (req, res, next) => {
    try {
        const recipyCategories = await RecipyCategory.find()
        res.status(200).json(recipyCategories)
    } catch (error) {
        next(error)
    }
}

export const getRecipyCategory = async (req, res, next) => {
    try {
        const recipyCategory = await RecipyCategory.findById(req.params.id)
        res.status(200).json(recipyCategory)
    } catch (error) {
        next(error)
    }
}

export const createRecipyCategory = async (req, res, next) => {
    try {
        const newRecipyCategory = await RecipyCategory.create(req.body)
        res.status(201).json(newRecipyCategory)
    } catch (error) {
        next(error)
    }
}

export const updateRecipyCategory = async (req, res, next) => {
    try {
        const updatedRecipyCategory = await RecipyCategory.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedRecipyCategory)
    } catch (error) {
        next(error)
    }
}

export const deleteRecipyCategory = async (req, res, next) => {
    try {
        await RecipyCategory.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Recipy category has been deleted" })
    } catch (error) {
        next(error)
    }
}
