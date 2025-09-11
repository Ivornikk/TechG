import { Op } from "sequelize"
import ApiError from "../errors/ApiError.mjs"
import models from "../models/models.mjs"
const {Wishlist, WishlistProduct, Product} =  models

class WishlistController {
    async getAll(req, res, next) {
        try {   
            const wishlists = await Wishlist.findAndCountAll()
            return res.json(wishlists)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getOne(req, res, next) {
        const { userId } = req.params
        try {
            const wishlist = await Wishlist.findAll({where: {userId}})
            console.log(wishlist)
            const items = await WishlistProduct.findAll({where: {wishlistId: wishlist[0].id}})

            const productsSearch = items.flatMap(item => {
                return {id: item.productId}
            })

            const products = await Product.findAll({where: {
                [Op.or]: productsSearch
            }})
            wishlist[0].setDataValue('products', products)

            return res.json(wishlist)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getFavorites(req, res, next) {
        try {
            const { productId } = req.params
            const products = await WishlistProduct.findAndCountAll({where: {productId}})
            return res.json(products)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async create(req, res, next) {
        const { userId } = req.body

        try {
            const wishlist = await Wishlist.create({userId})
            return res.json(wishlist)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async addProduct(req, res, next) {
        const { userId, productId } = req.body

        try {
            const wishlist = await Wishlist.findOne({where: {userId: userId}})

            const candidateItem = await WishlistProduct.findOne({
                where: {wishlistId: wishlist.id, productId}
            })
            if (candidateItem) {
                WishlistProduct.destroy({
                    where: {wishlistId: wishlist.id, productId}
                })
                return res.json({message: "Item removed from wishlist"})
            }
            else {
                const item = await WishlistProduct.create({
                    wishlistId: wishlist.id,
                    productId: productId
                })
                return res.json(item)
            }

        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async removeProduct(req, res, next) {
        const { userId, productId } = req.body

        try {   
            const wishlist = await Wishlist.findAll({where: {userId: userId}})

            const deleteCount = WishlistProduct.destroy({where: {
                wishlistId: wishlist[0].id,
                productId: productId
            }})
            if (deleteCount) return res.json({message: "Success"})
            else return res.json({message: "Failure"})
    } catch (err) {
        next(ApiError.badRequest(err.message))
    }
}

async remove(req, res) {
    const { userId } = req.params
    
    try {
        const deleteCount = Wishlist.delete({where: {userId: userId}})
        if (deleteCount) return res.json({message: "Success"})
        else return res.json({message: "Failure"})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async edit(req, res, next) {
        
    }
}

export default new WishlistController()