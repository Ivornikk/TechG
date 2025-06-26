import models from "../models/models.mjs"
import ApiError from "../errors/ApiError.mjs"
const {Basket} =  models

class BasketController {
    async create(req, res, next) {
        const {userId} = req.body
        try {
            const basket = Basket.create({userId})
            return res.json(basket)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getAll(req, res, next) {
        const {limit, page} = req.query
        let offset = page * limit - limit
        try {
            const baskets = await Basket.findAndCountAll({limit, offset})
            return res.json(baskets)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async getOne(req, res, next) {
        const {id} = req.params
        try {
            const basket = await Basket.findOne({where: {id}})
            return res.json(basket)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res) {
        const {id} = req.params
        const deleteCount = Basket.destroy({where: id})
        if (deleteCount) return res.json({"message": "Success!"})
        else return res.json({"message": "Failure!"})
    }
}

export default new BasketController()