import User from '../models/User.js'
import bcrypt from 'bcryptjs'

export const updateUser = async (req, res, next) => {
    try {
        if (req.userId !== req.params.id) {
            if (req.role !== "admin") {
                return res.status(403).json({ message: "You can update only your account" })
            }
        }

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 12)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        const { password: _, ...others } = updatedUser._doc

        res.status(200).json(others)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        if (req.userId !== req.params.id) {
            if (req.role !== "admin") {
                return res.status(403).json({ message: "You can delete only your account" })
            }
        }
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "User has been deleted" })
    } catch (error) {
        next(error)
    }
}
