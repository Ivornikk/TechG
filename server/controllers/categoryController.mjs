import models from "../models/models.mjs"
const {Category} =  models

class CategoryController {
    async getAll(req, res, next) {
        res.json({message: "Working category get all"})
    }
    async getOne(req, res, next) {
        res.json({message: "Working category get one"})
    }
    async create(req, res, next) {
        const {name} = req.body
        try {
            const category = await Category.create({name})
            return res.json(category)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res) {

    }
}

export default new CategoryController()