import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, userExists.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const { password: _, ...others } = userExists._doc
        const token = jwt.sign({ id: userExists._id, role: userExists.role }, process.env.JWT_SECRET, { expiresIn: "1w" })
        res.status(200).json({ ...others, token })
    } catch (error) {
        next(error)
    }
}

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        const pass = await bcrypt.hash(password, 12)
        const user = new User({ username, email, password: pass })
        const savedUser = await user.save()
        const { password: _, ...others } = savedUser._doc
        const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, { expiresIn: "1w" })
        res.status(201).json({ ...others, token })
    } catch (error) {
        next(error)
    }
}