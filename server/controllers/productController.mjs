import models from "../models/models.mjs"
import ApiError from "../errors/ApiError.mjs"
import { createProduct, searchProducts } from "../services/productService.mjs"
const {Product, Group, Type, Category} =  models

class ProductController {
    async getAll(req, res, next) {
        const {limit} = req.query || 5
        const {page} = req.query || 1
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

    async search(req, res, next) {
        try {
            const {q} = req.query
            const results = await searchProducts(q)
            res.json(results)
        } catch (err) {
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
            const product = await createProduct({
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
        const {id} = req.body
        let deleteCount = Product.destroy({where: {id: id}})
        if (deleteCount) return res.json({"message": "Success!"})
        else return res.json({"message": "Failure!"})
    }
    async edit(req, res, next) {
        
    }
}

export default new ProductController()