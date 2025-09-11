import ApiError from "../errors/ApiError.mjs"
import models from "../models/models.mjs"
const {Type, Group, Category, Product} =  models

class TypeController {
    async getAll(req, res, next) {
        try {
            const types = await Type.findAndCountAll({include: Category})
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
        try {
            const {id} = req.body

            const groups = await Group.findAll({
                where: {typeId: id}
            })

            const products = await Promise.all(
                groups.map(async group => {
                    const productsArray = await Product.findAll({
                        where: {groupId: group.id}
                    })
                    return productsArray
                })
            )

            products.forEach(productsArray => {
                productsArray.forEach(product => {
                    Product.destroy({
                        where: {id: product.id}
                    })
                })
            })

            groups.forEach(group => {
                Group.destroy({
                    where: {id: group.id}
                })
            })
            
            const deleteCount = Type.destroy({where: {id: id}})
            if (deleteCount) return res.json({"message": "Success!"})
            else return res.json({"message": "Failure!"})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

export default new TypeController()