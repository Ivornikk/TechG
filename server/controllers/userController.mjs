import models from "../models/models.mjs"
const {User, Basket} = models
import bcrypt from 'bcrypt'
import ApiError from '../errors/ApiError.mjs'
import jwt from 'jsonwebtoken'

const generateJwtToken = (id, username, email, role, pfp) => {
    return jwt.sign(
        {id, username, email, role, pfp},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {
            username,
            phoneNumber,
            email, 
            password,
            country,
            currency,
            language,
            role,
            avatar
        } = req.body
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('User with this email already exists.'))
        }
        
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({
            username,
            phoneNumber,
            email,
            password: hashPassword,
            country,
            currency,
            language,
            role,
            avatar,
        })
        console.log("FLAG")
        await Basket.create({userId: user.id})
        const token = generateJwtToken(user.id, user.username, user.email, user.role, user.avatar)
        return res.json({token})
    }
    
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Incorrect password'))
        }
        const token = generateJwtToken(user.id, user.username, user.email, user.role, user.avatar)
        return res.json({token})
    }
    
    async check(req, res, next) {
        try {
            const token = generateJwtToken(req.user.id, req.user.username, req.user.email, req.user.role, req.user.avatar)
            return res.json({token})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async edit(req, res, next) {
        
    }
}

export default new UserController()