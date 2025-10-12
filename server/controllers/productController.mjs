import models from "../models/models.mjs"
import ApiError from "../errors/ApiError.mjs"
import { createProduct, searchProducts } from "../services/productService.mjs"
import { v4 } from "uuid"
import { Op } from "sequelize"
const {Product, Warehouse, ProductInfo, OrderProduct, ProductInfoAttributeName, AttributeValue, AttributeName} = models
import syncProducts from '../syncOpenSearch.mjs'
import path from 'path'
import { fileURLToPath } from "url"

class ProductController {
    async getAll(req, res, next) {
        const {limit} = req.query || 5
        const {page} = req.query || 1
        let offset = (page * limit) - limit
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
        try {
            const { id } = req.params
            const product = await Product.findByPk(id)
            const productInfo = await ProductInfo.findOne({
                productId: product.id,
                include: [AttributeName, Warehouse]
            })

            await Promise.all(
                productInfo.attribute_names = productInfo.attribute_names?.flatMap(async attribute => {
                    const values = await AttributeValue.findAll({
                        where: {attributeNameId: attribute.id}
                    })
                    attribute.values = values
                })
            )

            product.setDataValue('info', productInfo)

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
        const {previewImage} = req.files

        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        
        let previewFileName = v4() + '.jpg'
        await previewImage.mv(path.resolve(__dirname, '..', 'static', previewFileName))

            const product = await createProduct({
                title: title, 
                price: price, 
                description: description,
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