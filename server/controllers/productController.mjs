import models from "../models/models.mjs"
import ApiError from "../errors/ApiError.mjs"
import { createProduct, searchProducts } from "../services/productService.mjs"
import { v4 } from "uuid"
import { Op } from "sequelize"
const {Product, Group, OrderProduct, ProductAttributeValue, AttributeValue, Attribute} = models
import syncProducts from '../syncOpenSearch.mjs'
import path from 'path'

class ProductController {
    async getAll(req, res, next) {
        const {limit} = req.query || 5
        const {page} = req.query || 1
        let offset = page * limit - limit
        try {
            const products = await Product.findAndCountAll({
                limit, offset
            })
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

            const attributesIds = await ProductAttributeValue.findAll({
                where: {productId: id}
            }).then(data => {
                return data.flatMap(attribute => {
                    return attribute.attributeValueId
                })
            })
            const reversedAttributes = await AttributeValue.findAll({
                where: {
                    id: attributesIds
                },
                include: Attribute
            })
            const whereClause = await Attribute.findAll({
                where: {id: reversedAttributes.flatMap(el => {
                    let result = []
                    result += el.attribute.id
                    return result
                })}
            }).then(data => {
                return new Set(data.flatMap(el => el.id))
            })
            let attrResult = await Attribute.findAll({
                where: {id: Array.from(whereClause)}
            })
            const values = await AttributeValue.findAll({
                where: {attributeId: attrResult.flatMap(el => el.id)}
            })
            attrResult = attrResult.flatMap(result => {
                result.setDataValue('values', values.filter(el => el.attributeId == result.id))
                return result
            })

            product.setDataValue('attributes', attrResult)

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
            
            const ids = results.map(result => {
                return result.id
            })
            let products = {
                count: 0,
                rows: []
            }

            if (results.length > 0)
                products = await Product.findAndCountAll({
                    where: {id: {[Op.and]: ids}}
                })
            return res.json(products)
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
        const {descriptionImages} = req.files
        const {previewImage} = req.files

        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)

        let previewFileName = v4() + '.jpg'
        previewImage.mv(path.resolve(__dirname, 'static', previewFileName))
        let descriptionImagesNames = []

        if (Array.isArray(descriptionImages)) {
            for (let i = 0; i < descriptionImages.length; i++)
                descriptionImagesNames.push(v4() + '.jpg')
            
            descriptionImages.map((image, index) => {
                image.mv(path.resolve(__dirname, 'static', descriptionImagesNames[index]))
            })
        }
        else {
            descriptionImagesNames.push(v4() + '.jpg')
            descriptionImages.mv(path.resolve(__dirname, 'static', descriptionImagesNames[0]))
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

            syncProducts()

            return res.json(product)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async remove(req, res) {
        try {
            const {id} = req.body

            let deleteCount = Product.destroy({where: {id: id}})
            if (deleteCount) return res.json({"message": "Success!"})
            else return res.json({"message": "Failure!"})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async edit(req, res, next) {
        try {
            const { title, price, description, attrValue, attributeId } = req.body
            const { id } = req.params

            const product = await Product.findOne({
                where: {id}
            })
            if (!product) return res.json({message: "Product not found"})

            if (title) product.title = title
            if (price) product.price = price
            if (description) product.description = description

            await product.save()

            if (attrValue) {
                const attributeValCandidate = await AttributeValue.findOne({
                    where: {value: attrValue}
                })

                if (attributeValCandidate) {
                    await ProductAttributeValue.create({
                        productId: id, attributeValueId: attributeValCandidate.id, attributeId
                    })
                }
                else {
                    const newVal = await AttributeValue.create({
                        value: attrValue, attributeId
                    })
                    await ProductAttributeValue.create({
                        productId: id, attributeValueId: newVal.id
                    })
                }
            }

            return res.json(product)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getSoldCount(req, res, next) {
        try {
            const {id} = req.params
            const count = await OrderProduct.count({
                where: {productId: id}
            })

            return res.json(count)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

export default new ProductController()