import models from "../models/models.mjs"
const {User, Basket, Wishlist} = models
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
        try {
            const {
                username,
                phoneNumber,
                email, 
                password,
                country,
                currency,
                language,
                avatar
            } = req.body

            const role = 'USER'

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
            await Basket.create({userId: user.id})
            await Wishlist.create({userId: user.id})
    
            const token = generateJwtToken(user.id, user.username, user.email, user.role, user.avatar)
    
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 60 * 60 * 24 * 7 * 1000,
                sameSite: 'strict',
                path: '/'
            })
    
            return res.status(201).json(user)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    
    async login(req, res, next) {
        const {email, password} = req.body

        try {
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.badRequest('User not found'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest('Incorrect password'))
            }
            const token = generateJwtToken(user.id, user.username, user.email, user.role, user.avatar)
    
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 60 * 60 * 24 * 7 * 1000,
                sameSite: 'strict',
                path: '/'
            })

            return res.json(user)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    
    async check(req, res, next) {
        const user = req.user

        try {
            const token = generateJwtToken(user.id, user.username, user.email, user.role, user.avatar)

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                maxAge: 60 * 60 * 24 * 7 * 1000,
                sameSite: 'strict',
                path: '/'
            })

            return res.json(user)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let {role, sort} = req.query

            if (role == 'all') role = ['USER', 'ADMIN']
            sort = JSON.parse(sort)

            const users = await User.findAndCountAll({
                where: {role},
                order: [
                    sort
                ]
            })

            return res.json(users)
        } catch (err) { 
            next(ApiError.badRequest(err.message))
        }
    }

    async logOut(req, res, next) {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/'
            })
            return res.json({message: 'Logged out successfully'})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async edit(req, res, next) {
        const { email, username, oldPassword, newPassword } = req.body
        const { id } = req.params
        try {
            const user = await User.findOne({
                where: {id: id}
            })
            if (email) {
                user.email = email
            }
            if (username) {
                user.username = username
            }
            if (newPassword) {
                const validate = await bcrypt.compareSync(oldPassword, user.password)
                if (validate) {
                    user.passwrod = await bcrypt.hash(newPassword, 5)
                }
                else return res.json({message: 'Passwrods do not match'})
            }
            await user.save()
            return res.json(user)
        } catch (err) { 
            next(ApiError.badRequest(err.message))
        }
    }

    async remove(req, res, next) {
        try {
            const {id} = req.body
            let deleteCount = User.destroy({where: { id: id }})
            if (deleteCount) return res.json({message: 'Success!'})
            else return res.json({message: 'Failure!'})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async changeCountry(req, res, next) {
        try {
            const {country, userId} = req.body

            const user = await User.findByPk(userId)
            user.country = country
            await user.save()
            
            return res.json(user)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

export default new UserController()