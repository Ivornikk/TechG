import models from "../models/models.mjs"
import ApiError from "../errors/ApiError.mjs"
const {Order, User, Product, OrderProduct} =  models

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
    async getByUser(req, res, next) {
        const {userId} = req.params
        const {status} = req.body

        try {
            let orders

            if (status) {
                orders = await Order.findAndCountAll({
                    where: {
                        userId: userId,
                        status: status
                    }
                })
            }
            else {
                orders = await Order.findAndCountAll({
                    where: {
                        userId: userId
                    }
                })
            }
            orders.rows = await Promise.all(
                orders.rows.flatMap(async order => {
                    const products = await OrderProduct.findAll({
                        where: {orderId: order.id}
                    })
                    order.setDataValue('products', products)
                    return order
                })
            )

            return res.json(orders)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async create(req, res, next) {
        const {
            status,
            paymentMethod,
            userId,
            addressId,
            products
        } = req.body
        try {
            const order = await Order.create({
                status, paymentMethod, userId, addressId
            })
            const resProducts = []
            await products.map(async product => {
                await OrderProduct.create({
                    quantity: product.quantity,
                    priceAtPurchase: product.priceAtPurchase,
                    orderId: order.id,
                    productId: product.id
                })
                .then(data => resProducts.push(data))
            })
            order.setDataValue('products', products)
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
        const {id} = req.body
        const deleteCount = Order.destroy({where: {id: id}})
        if (deleteCount) return res.json({"message": "Success!"})
        else return res.json({"message": "Failure!"})
    }
}

export default new OrderController()