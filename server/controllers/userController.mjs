import models from "../models/models.mjs"
const {User} = models
import bcrypt from 'bcrypt'

class UserController {
    async registration(req, res, next) {
        const {
            username,
            gender,
            phoneNumber,
            email,
            password,
            country,
            currency,
            language,
            role,
            avatar
        } = req.body

        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create({
            username,
            gender,
            phoneNumber,
            email,
            password: hashPassword,
            country,
            currency,
            language,
            role,
            avatar
        })
        res.json(user)
    }

    async login(req, res, next) {
        res.json({message: "Working user login"})
    }
 
    async check(req, res, next) {
        res.json({message: "Working user auth"})
    }
}

export default new UserController()