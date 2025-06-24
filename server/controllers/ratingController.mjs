import models from "../models/models.mjs"
const {Rating} =  models

class RatingController {
    async getAll(req, res, next) {
        res.json({message: "Working address get all"})
    }
    async getOne(req, res, next) {
        res.json({message: "Working address get one"})
    }
    async create(req, res, next) {
        res.json({message: "Working address create"})
    }
    async remove(req, res) {

    }
}

export default new RatingController()