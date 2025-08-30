import models from "../models/models.mjs"
import ApiError from "../errors/ApiError.mjs"
const {Basket, BasketProduct} = models

class BasketController {
    async create(req, res, next) {
        const {userId} = req.body
        try {
            const basket = await Basket.create({userId})
            return res.json(basket)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async addProduct(req, res, next) {
        const {basketId, productId, quantity} = req.body
        try {
            const item = await BasketProduct.create({basketId, productId, quantity})
            return res.json(item)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async removeProduct(req, res, next) {
        const {productId} = req.body
        let deleteCount = BasketProduct.destroy({where: {productId: productId}})
        if (deleteCount) return res.json({message: "Success"})
        else return res.json({message: "Failure"})
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
        const {userId} = req.params
        try {
            const basket = await Basket.findAll({where: {userId: userId}})
            const items = await BasketProduct.findAndCountAll({where: {basketId: basket[0].id}})
            basket[0].setDataValue("items", items)
            return res.json(basket)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res) {
        const {userId, productId} = req.body
        try {
            const basket = await Basket.findAll({where: {userId: userId}})
            const deleteCount = Basket.destroy({where: {
                basketId: basket.id, productId: productId
            }})
            if (deleteCount) return res.json({"message": "Success!"})
            else return res.json({"message": "Failure!"})
        }
        catch (err) {
            next(ApiError.badRequest({message: err.message}))
        }
    }
}

export default new BasketController()