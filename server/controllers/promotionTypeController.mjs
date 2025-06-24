import models from "../models/models.mjs"
const {PromotionType} =  models

class PromotionTypeController {
    async getAll(req, res, next) {
        res.json({message: "Working promotion type get all"})
    }
    async getOne(req, res, next) {
        res.json({message: "Working promotion type get one"})
    }
    async create(req, res, next) {
        res.json({message: "Working promotion type create"})
    }
    async remove(req, res) {

    }
}

export default new PromotionTypeController()