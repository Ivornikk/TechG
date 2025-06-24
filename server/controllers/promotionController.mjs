import models from "../models/models.mjs"
const {Promotion} =  models

class PromotionController {
    async getAll(req, res, next) {
        res.json({message: "Working promotion get all"})
    }
    async getOne(req, res, next) {
        res.json({message: "Working promotion get one"})
    }
    async create(req, res, next) {
        res.json({message: "Working promotion create"})
    }
    async remove(req, res) {

    }
    async edit(req, res, next) {

    }
}

export default new PromotionController()