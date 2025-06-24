import models from "../models/models.mjs"
const {Type} =  models

class TypeController {
    async getAll(req, res, next) {
        res.json({message: "Working type get all"})
    }
    async getOne(req, res, next) {
        res.json({message: "Working type get one"})
    }
    async create(req, res, next) {
        res.json({message: "Working type create"})
    }
    async remove(req, res) {

    }
}

export default new TypeController()