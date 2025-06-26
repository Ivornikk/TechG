import models from "../models/models.mjs"
import ApiError from "../errors/ApiError.mjs"
const {Order, Product, OrderProduct} =  models

class OrderController {
    async getAll(req, res, next) {
        const {userId} = req.body
        const {limit, page} = req.query
        let offset = page * limit - limit
        try {
            let orders
            if (userId)
                orders = await Order.findAndCountAll({where: {userId}, limit, offset})
            else
                orders = await Order.findAndCountAll({limit, offset})
            return res.json(orders)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async getOne(req, res, next) {
        const {id} = req.params
        try {
            const order = await Order.findOne({
                where: {id},
                include: [{model: {Product}, through: OrderProduct}]
            })
            return res.json(order)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async create(req, res, next) {
        const {userId, paymentMethod} = req.body
        try {
            const order = await Order.create({userId: userId, paymentMethod: paymentMethod})
            return res.json(order)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res) {

    }
}

export default new OrderController()