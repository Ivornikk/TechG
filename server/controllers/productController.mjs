import models from "../models/models.mjs"
import ApiError from "../errors/ApiError.mjs"
import { createProduct, searchProducts } from "../services/productService.mjs"
import { v4 } from "uuid"
const {Product, Group} = models

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
        try {
        const {
            title,
            price,
            description,
            groupId,
        } = req.body
        const {previewImage} = req.files
        const {descriptionImages} = req.files

        console.log(req.files)

        let previewFileName = v4() + '.jpg'
        let descriptionImagesNames = []

        previewImage.mv(`${process.cwd()}\\static\\${previewFileName}`)
        if (Array.isArray(descriptionImages)) {
            for (let i = 0; i < descriptionImages.length; i++)
                descriptionImagesNames.push(v4() + '.jpg')
            
            descriptionImages.map((image, index) => {
                image.mv(`${process.cwd()}\\static\\${descriptionImagesNames[index]}`)
            })
        }
        else {
            descriptionImagesNames.push(v4() + '.jpg')
            descriptionImages.mv(`${process.cwd()}\\static\\${descriptionImagesNames[0]}`)
        }
        
        descriptionImagesNames = descriptionImagesNames.toString()

            const product = await createProduct({
                title: title, 
                price: price, 
                description: description, 
                description_images: descriptionImagesNames,
                preview_image: previewFileName,
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