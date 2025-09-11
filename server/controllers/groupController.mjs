import ApiError from "../errors/ApiError.mjs"
import models from "../models/models.mjs"
const {Group, Type, Product} =  models

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
        try {
            const {name, typeId} = req.body
            const group = await Group.create({name, typeId})
            return res.json(group)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res) {
        try {
            const {id} = req.body

            const products = await Product.findAll({
                where: {groupId: id}
            })

            products.forEach(product => {
                Product.destroy(product.id)
            })

            const deleteCount = Group.destroy({where: {id: id}})
            if (deleteCount) return res.json({"message": "Success!"})
            else return res.json({"message": "Failure!"})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

export default new GroupController()