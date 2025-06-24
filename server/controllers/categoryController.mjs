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
        res.json({message: "Working category create"})
    }
    async remove(req, res) {

    }
}

export default new CategoryController()