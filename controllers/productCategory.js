import ProductCategory from '../models/ProductCategory.js'

export const getProductCategories = async (req, res, next) => {
    try {
        const productCategories = await ProductCategory.find()
        res.status(200).json(productCategories)
    } catch (error) {
        next(error)
    }
}

export const getProductCategory = async (req, res, next) => {
    try {
        const productCategory = await ProductCategory.findById(req.params.id)
        res.status(200).json(productCategory)
    } catch (error) {
        next(error)
    }
}

export const createProductCategory = async (req, res, next) => {
    try {
        const newProductCategory = await ProductCategory.create(req.body)
        res.status(201).json(newProductCategory)
    } catch (error) {
        next(error)
    }
}

export const updateProductCategory = async (req, res, next) => {
    try {
        const updatedProductCategory = await ProductCategory.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedProductCategory)
    } catch (error) {
        next(error)
    }
}

export const deleteProductCategory = async (req, res, next) => {
    try {
        await ProductCategory.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Product category has been deleted" })
    } catch (error) {
        next(error)
    }
}
