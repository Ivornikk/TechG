import models from "../models/models.mjs"
const {Category, Type, Group, Product} =  models

class CategoryController {
    async getAll(req, res, next) {
        try {
            const categories = await Category.findAndCountAll()
            return res.json(categories)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async getOne(req, res, next) {
        const {id} = req.params
        try {
            const category = await Category.findOne({where: {id}, include: [{
                model: Type,
                include: [{model: Group}]
                }]
            })
            return res.json(category)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async create(req, res, next) {
        const {name} = req.body
        try {
            const category = await Category.create({name})
            return res.json(category)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async remove(req, res) {
        try {
            const {id} = req.body
            
            const deleteCount = Category.destroy({where: {id: id}})
            if (deleteCount) return res.json({"message": "Success!"})
            else return res.json({"message": "Failure!"})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

export default new CategoryController()