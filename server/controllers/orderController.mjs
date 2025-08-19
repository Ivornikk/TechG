import models from "../models/models.mjs"
import ApiError from "../errors/ApiError.mjs"
const {Order, Product, OrderProduct} =  models

class OrderController {
    async getAll(req, res, next) {
        const {limit, page} = req.query
        let offset = page * limit - limit
        try {
            let orders
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
            let order = await Order.findOne({
                where: {id}
            })
            const products = await OrderProduct.findAll({
                where: {orderId: id}
            })
            return res.json(order)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async getProducts(req, res, next) {
        const {id} = req.params

        try {
            const products = await OrderProduct.findAll({
                where: {orderId: id}
            })
            return res.json(products)
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
    async addProduct(req, res, next) {
        const {id} = req.params
        const {productId} = req.body

        try {
            const result = await OrderProduct.create({
                orderId: id,
                productId
            })
            return res.json(result)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res) {
        const {id} = req.params
        const deleteCount = Order.destroy({where: id})
        if (deleteCount) return res.json({"message": "Success!"})
        else return res.json({"message": "Failure!"})
    }
}

export default new OrderController()