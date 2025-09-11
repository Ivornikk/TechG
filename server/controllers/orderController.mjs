import models from "../models/models.mjs"
import ApiError from "../errors/ApiError.mjs"
import { Op } from "sequelize"
const {Order, Address, Product, OrderProduct} =  models

class OrderController {
    async getAll(req, res, next) {
        try {
            const {limit, page} = req.query
            const sort = JSON.parse(req.query.sort)
            const filter = JSON.parse(req.query.filter)
            let offset = page * limit - limit

            const whereClause = filter.trackingNum == 'true' ? 
                {trackingNumber: {[Op.ne]: null}} :
                filter.trackingNum == 'all' ? {} :
                {trackingNumber: null}
                
            if (filter.status != 'all') {
                whereClause.status = filter.status
            }
            
            const orders = await Order.findAndCountAll({
                limit, offset,
                where: whereClause,
                order: [
                    sort
                ]
            })
            return res.json(orders)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async checkUserForOrder(req, res, next) {
        try {
            const {userId, productId} = req.query

            const orders = await Order.findAll({
                where: {userId}
            })
            const matches = await Promise.all(
                orders.flatMap(async order => {
                    const match = await OrderProduct.findOne({
                        where: {orderId: order.id, productId}
                    })
                    return match
                })
            )
            
            if (matches.length > 0 && matches[0] != null) return res.json(true)
            else return res.json(false)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const order = await Order.findOne({where: {id}})

            const items = await OrderProduct.findAll({where: {orderId: order.id}})
            order.setDataValue('items', items)

            order.dataValues.items = await Promise.all(
                order.dataValues.items.flatMap(async item => {
                    const product = await Product.findOne({where: {id: item.productId}})
                    item.setDataValue('product', product)
                    return item
                })
            )

            const address = await Address.findOne({where: {id: order.addressId}})
            order.setDataValue('address', address)
            
            return res.json(order)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async getByUser(req, res, next) {
        const {userId} = req.params
        const {status} = req.query || 'all'
        try {
            let orders

            if (status != 'all') {
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
                    const items = await OrderProduct.findAll({
                        where: {orderId: order.id}
                    })
                    order.setDataValue('items', items)
                    return order
                })
            )
            orders.rows = await Promise.all(
                orders.rows.flatMap(async order => {
                    order.items = await Promise.all(
                        order.dataValues.items.flatMap(async item => {
                            const product = await Product.findOne({
                                where: {id: item.productId}
                            })
                            item.setDataValue('product', product)
                            return item
                        })
                    )
                    const address = await Address.findOne({
                        where: {id: order.addressId}
                    })
                    order.setDataValue('address', address)
                    return order
                })
            )

            return res.json(orders)
        }
        catch (err) {
            console.log(err)
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

    async addTrackingNum(req, res, next) {
        try {
            console.log(req.body)
            const {id, trackingNumber} = req.body
            const order = await Order.findOne(
                {where: { id }}
            )
            order.trackingNumber = trackingNumber
            order.save()

            return res.json(order)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async EditStatus(req, res, next) {
        try {
            const {id, status} = req.body

            const order = await Order.findOne({
                where: { id }
            })
            order.status = status
            order.save()

            return res.json(order)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async remove(req, res) {
        const {id} = req.body
        OrderProduct.destroy({
            where: {orderId: id}
        })
        const deleteCount = Order.destroy({where: {id: id}})
        if (deleteCount) return res.json({"message": "Success!"})
        else return res.json({"message": "Failure!"})
    }
}

export default new OrderController()