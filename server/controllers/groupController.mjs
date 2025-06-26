import models from "../models/models.mjs"
const {Group} =  models

class GroupController {
    async getAll(req, res, next) {
        try {
            const groups = await Group.findAndCountAll()
            return res.json(groups)
        }
        catch (err) {
            return res.json({"Message": "An error occured!"})
        }
    }
    async getOne(req, res, next) {
        res.json({message: "Working group get one"})
    }
    async create(req, res, next) {
        const {name, typeId} = req.body
        try {
            const group = await Group.create({name, typeId})
            return res.json(group)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res) {

    }
}

export default new GroupController()