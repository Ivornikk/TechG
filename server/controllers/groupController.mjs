import models from "../models/models.mjs"
const {Group, Type} =  models

class GroupController {
    async getAll(req, res, next) {
        try {
            const groups = await Group.findAndCountAll({include: Type})
            return res.json(groups)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
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
        const {id} = req.body
        const deleteCount = Group.destroy({where: {id: id}})
        if (deleteCount) return res.json({"message": "Success!"})
        else return res.json({"message": "Failure!"})
    }
}

export default new GroupController()