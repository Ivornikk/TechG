import ApiError from "../errors/ApiError.mjs"
import models from "../models/models.mjs"
const {Type, Group} =  models

class TypeController {
    async getAll(req, res, next) {
        try {
            const types = await Type.findAndCountAll()
            return res.json(types)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async getOne(req, res, next) {
        const {id} = req.params
        try {
            const type = await Type.findOne({where: {id}, include: Group})
            return res.json(type)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async create(req, res, next) {
        const {name, categoryId} = req.body
        try {
            const type = await Type.create({name, categoryId})
            return res.json(type)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res) {
        const {id} = req.params
        const deleteCount = Type.destroy({where: id})
        if (deleteCount) return res.json({"message": "Success!"})
        else return res.json({"message": "Failure!"})
    }
}

export default new TypeController()