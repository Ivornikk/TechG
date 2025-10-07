import models from "../models/models.mjs"
const {Rating, User} =  models
import ApiError from '../errors/ApiError.mjs'
import { v4 } from "uuid"
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from "url"

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
            let {sort} = req.query

            if (!productId) return res.json({message: 'Invalid product id: ' + productId})
            sort = JSON.parse(sort)

            let ratings = await Rating.findAndCountAll({
                where: {productId},
                order: [
                    sort
                ]
            })

            ratings.rows = await Promise.all(
                ratings.rows.flatMap(async rating => {
                    const user = await User.findOne({where: {id: rating.userId}})
                    rating.setDataValue('user', user)
                    return rating
                })
            )

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
            const {rate, review, userId, productId} = req.body
            const {images} = req.files
            let imagesNames = []

            const __filename = fileURLToPath(import.meta.url)
            const __dirname = path.dirname(__filename)
            if (Array.isArray(images)) {
                images.forEach((image, index) => {
                    imagesNames.push(v4() + '.jpg')
                    image.mv(path.resolve(__dirname, '..', 'static', imagesNames[index]))
                })
            } else {
                imagesNames.push(v4() + '.jpg')
                images.mv(path.resolve(__dirname, '..', 'static', imagesNames[0]))
            }
            imagesNames = imagesNames.toString()
            const rating = await Rating.create({
                rate, review, images: imagesNames, userId, productId
            })

            return res.json(rating)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res, next) {
        try {
            const {id} = req.body
            const review = await Rating.findOne({where: {id}})
            if (review.images != null) {
                const imagesNames = review.images.split(',')
                imagesNames.forEach(name => {
                    fs.unlinkSync(path.resolve(__dirname, '..', 'static', name))
                })
            }

            const deleteCount = Rating.destroy({where: {id}})
            if (deleteCount) return res.json({message: "Success"})
            else return res.json({message: 'Failure'})
            
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

export default new RatingController()