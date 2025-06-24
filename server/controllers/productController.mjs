import models from "../models/models.mjs"
const {Product} =  models

class ProductController {
    async getAll(req, res, next) {
        res.json({message: "Working product get all"})
    }
    async getOne(req, res, next) {
        res.json({message: "Working product get one"})
    }
    async create(req, res, next) {
        res.json({message: "Working product create"})
    }
    async remove(req, res) {

    }
    async edit(req, res, next) {

    }
}

export default new ProductController()