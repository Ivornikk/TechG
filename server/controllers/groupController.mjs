import models from "../models/models.mjs"
const {Group} =  models

class GroupController {
    async getAll(req, res, next) {
        res.json({message: "Working group get all"})
    }
    async getOne(req, res, next) {
        res.json({message: "Working group get one"})
    }
    async create(req, res, next) {
        res.json({message: "Working group create"})
    }
    async remove(req, res) {

    }
}

export default new GroupController()