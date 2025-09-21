import models from "../models/models.mjs"
const {Category, Type, Group} =  models

class CategoryController {
    async getAll(req, res, next) {
        try {
            const {includeSub} = req.query

            const categories = await Category.findAndCountAll()

            if (!includeSub)
                return res.json(categories)

            categories.rows = await Promise.all (
                categories.rows.flatMap(async (cat) => {
                    const category = await Category.findOne({
                        where: cat.id, include: [{
                            model: Type,
                            include: [{ model: Group }]
                        }]
                    })
                    return category
                })
            )
            return res.json(categories)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async getOne(req, res, next) {
        const {id} = req.params
        try {
            const category = await Category.findOne({ where: {id}, include: [{
                model: Type,
                include: [{ model: Group }]
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