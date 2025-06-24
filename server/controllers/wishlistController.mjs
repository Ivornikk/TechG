import models from "../models/models.mjs"
const {Wishlist} =  models

class WishlistController {
    async getAll(req, res, next) {
        res.json({message: "Working wishlist get all"})
    }
    async getOne(req, res, next) {
        res.json({message: "Working wishlist get one"})
    }
    async create(req, res, next) {
        res.json({message: "Working wishlist create"})
    }
    async remove(req, res) {

    }
    async edit(req, res, next) {

    }
}

export default new WishlistController()