import models from "../models/models.mjs"
import ApiError from "../errors/ApiError.mjs"
import { Op } from "sequelize"
const {Basket, BasketProduct, Product} = models

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
        const {userId, productId, quantity} = req.body
        try {
            const basket = await Basket.findAll({where: {userId: userId}})

            const candidateItem = await BasketProduct.findOne({
                where: {productId}
            })

            if (candidateItem && candidateItem.basketId == basket.id) {
                candidateItem.quantity += quantity
                candidateItem.save()
                return res.json(candidateItem)
            } else {
                const item = await BasketProduct.create({basketId: basket[0].id, productId, quantity})
                return res.json(item)
            }
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getItemsCountByUser(req, res, next) {
        try {
            const {userId} = req.query

            const basket = await Basket.findOne({
                where: {userId}
            })

            const count = await BasketProduct.count({
                where: {basketId: basket.id}
            })

            return res.json({count})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async removeProduct(req, res, next) {
        try {
            const {userId, productId} = req.body
            const basket = await Basket.findAll({where: {userId: userId}})
            const deleteCount = BasketProduct.destroy({where: {
                basketId: basket[0].id, productId: productId
            }})
            if (deleteCount) return res.json({"message": "Success!"})
            else return res.json({"message": "Failure!"})
        }
        catch (err) {
            next(ApiError.badRequest({message: err.message}))
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
        const {userId} = req.params
        try {
            const basket = await Basket.findAll({where: {userId: userId}})
            const items = await BasketProduct.findAll({where: {basketId: basket[0].id}})

            const productsSearch = items.flatMap(item => {
                return {id: item.productId}
            })

            const products = await Product.findAll({
                where: {
                    [Op.or]: productsSearch
                }
            })

            items.forEach((item) => {
                products.map(product => {
                    if (item.productId == product.id) {
                        product.setDataValue('quantity', item.quantity)
                        return product
                    }
                })
            })

            basket[0].setDataValue('products', products)
            return res.json(basket)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res) {
    }
}

export default new BasketController()