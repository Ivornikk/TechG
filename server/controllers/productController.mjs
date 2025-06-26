import models from "../models/models.mjs"
import ApiError from "../errors/ApiError.mjs"
const {Product, Group, Type, Category} =  models

class ProductController {
    async getAll(req, res, next) {
        const {limit, page} = req.query
        let offset = page * limit - limit
        try {
            const products = await Product.findAndCountAll({limit, offset})
            return res.json(products)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async getOne(req, res, next) {
        const {id} = req.params
        try {
            const product = await Product.findOne({where: {id}, include: Group})
            return res.json(product)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async create(req, res, next) {
        const {
            title,
            price,
            description,
            descriptionImages,
            previewImage,
            groupId
        } = req.body
        try {
            const product = await Product.create({
                title: title, 
                price: price, 
                description: description, 
                descriptionImages: descriptionImages,
                preview_image: previewImage,
                groupId: groupId
            })
            return res.json(product)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res) {
        const {id} = req.params
        const deleteCount = Product.destroy({where: id})
        if (deleteCount) return res.json({"message": "Success!"})
        else return res.json({"message": "Failure!"})
    }
    async edit(req, res, next) {
        
    }
}

export default new ProductController()