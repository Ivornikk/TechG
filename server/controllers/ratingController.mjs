import models from "../models/models.mjs"
const {Rating} =  models
import ApiError from '../errors/ApiError.mjs'
import { Op } from "sequelize"

class RatingController {
    async getAll(req, res, next) {
        res.json({message: "Working address get all"})
    }
    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const rating = await Rating.findOne({
                where: {id}
            })

            return res.json(rating)
        } catch (err) { 
            next(ApiError.badRequest(err.message))
        }
    }
    async getByProduct(req, res, next) {
        try {   
            const {productId} = req.params
            let {rate, sort} = req.query

            if (rate == 'all') rate = {}
            if (!productId) return res.json({message: 'Invalid product id: ' + productId})
            sort = JSON.parse(sort)

            const ratings = await Rating.findAndCountAll({
                where: {[Op.and] : [productId, rate]},
                order: [
                    sort
                ]
            })

            return res.json(ratings)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async getByUser(req, res, next) {
        try {
            const {userId} = req.params
            if (!userId) return res.json({message: 'invalid user id: ' + userId})

            const ratings = await Rating.findAndCountAll({
                where: {userId}
            })
            return res.json(ratings)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async create(req, res, next) {
        try {
            const {rate, review, images, userId, productId} = req.body

            const rating = await Rating.create({
                rate, review, images, userId, productId
            })

            return res.json(rating)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res) {

    }
}

export default new RatingController()