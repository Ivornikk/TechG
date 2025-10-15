import ApiError from '../errors/ApiError.mjs'
import models from '../models/models.mjs'
import fetch from 'node-fetch'
import syncProducts from '../syncOpenSearch.mjs'
require('../productInfoUpdated.json')
import fs from 'fs'

const {Category, Product, AttributeName, AttributeValue, ProductInfo, ProductInfoAttributeName,
    Warehouse, WarehouseProductInfo, ProductImage
} = models

class SupplierController {

    async getToken(req, res, next) {
        try {
            const params = new URLSearchParams({
                app_id: process.env.SUPPLIER_KEY_PUBLIC,
                app_secret: process.env.SUPPLIER_KEY_SECRET,
            });
            const address = `https://api.banggood.com/getAccessToken?${params.toString()}`
            const response = await fetch(address, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const token = await response.json()

            console.log("PARAMS: ", params.toString())
            console.log("PUBLIC: ", process.env.SUPPLIER_KEY_PUBLIC)
            console.log("SECRET: ", process.env.SUPPLIER_KEY_SECRET)
            console.log("RESPONSE: ", token)

            return res.json(token)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async UpdateCategories(req, res, next) {
        try {
            const {Access_token} = req.body
            await Category.destroy({
                where: {}
            })
            let categories = await fetch(
                `https://api.banggood.com/category/getCategoryList?access_token=${Access_token}&page=1&lang=en`
            )
            categories = await categories.json()

            const pagesTotal = categories.pages_total
            const pagesArray = []
            for (let i = 1; i <= pagesTotal; i++) {
                pagesArray.push(i)
            }
            pagesArray.forEach(async page => {
                let result = await fetch(
                    `https://api.banggood.com/category/getCategoryList?access_token=${Access_token}&page=${page}&lang=en`
                )
                categories.cat_list.push(result.cat_list)
            })
            console.log(categories)
            await Promise.all(
                categories.cat_list.map(async category => {
                    await Category.create({
                        id: category.cat_id,
                        name: category.cat_name,
                        parent: category.parent_id
                    })
                })
            )
            
            return res.json(categories)
        } catch (err) { 
            next(ApiError.badRequest(err.message))
        }
    }

    async updateProducts(req, res, next) {
        try {
            const { Access_token } = req.body
            let categories = await Category.findAll()
            const productList = []

            await Promise.all(
                categories.flatMap(async category => {
                    const children = await Category.findAll({
                        where: { parent: category.id }
                    })
                    if (children.length == 0) return category
                    else return []
                })
            )
            const products = []

            await Promise.all(
                categories.forEach(async category => {
                    let result = await fetch(
                        `https://api.banggood.com/product/getProductList?access_token=${Access_token}&cat_id=${category.id}}`
                    )
                    result = await result.json()
                    console.log(result)
                    products.push(result.product_list)
                    console.log("FLAG")
                })
            )

            await Product.destroy({
                where: {}
            })

            await Promise.all(
                products.product_list.map(async product => {
                    await Product.create({
                        id: product.product_id,
                        title: product.product_name,
                        description: product.meta_desc,
                        categoryId: product.cat_id,
                        preview_image: product.img,
                    })
                })
            )

            syncProducts()

            return res.json(productList)
        }  catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async updateOneProduct(req, res, next) {
        try {
            const { id, accessToken } = req.body

            const infoCandidate = await ProductInfo.findOne({
                where: { productId: id}
            })

            if (infoCandidate) {
                const updatedInfo = JSON.parse(fs.readFileSync('../productInfoUpdated.json'))
                let candidateLastUpdatedDate = updatedInfo.flatMap(el => {
                    if (el.productId == id) return el.LAST_UPDATED
                })
                candidateLastUpdatedDate = Date.parse(candidateLastUpdatedDate)

                // Estimates how much time has passed since the lastt update of
                // the product info in hours
                const sinceLastUpdated = (Date.now() - candidateLastUpdatedDate / 100 / 60 / 60).toFixed()
                if (sinceLastUpdated < 24) {
                    const productInfo = await ProductInfo.findByPk(infoCandidate.id, {
                        include: [
                            {
                                model: AttributeName,
                                as: 'attributes',
                                include: {
                                    model: AttributeValue,
                                    as: 'values'
                                }
                            },
                            {
                                model: Warehouse,
                                as: 'warehouses'
                            },
                            {
                                model: ProductImage,
                                as: 'images'
                            }
                        ]
                    })
                    return res.json(productInfo)
                }
            }

            const response = await fetch(
                `https://api.banggood.com/product/getProductInfo?access_token=${accessToken}&product_id=${id}&currency=EUR&lang=en`
            )
            const product = await response.json()

            const productInfo = await ProductInfo.create({
                fullDescription: product.description,
                weight: product.weight,
                productName: product.product_name,
                productId: id
            })

            productInfo.LAST_UPDATED = new Date().toDateString()
            fs.appendFileSync('../productInfoUpdated.json', JSON.stringify(productInfo))

            product.attributes = await Promise.all(
                product.poa_list.map(async el => {
                    const attrName = await AttributeName.create({
                        id: el.option_id,
                        name: el.option_name
                    })
                    await Promise.all(
                        el.option_values.map(async value => {
                            await AttributeValue.create({
                                id: value.poa_id,
                                value: value.poa_name,
                                price: value.poa_price,
                                smallImage: value.small_image,
                                viewImage: value.view_image,
                                largeImage: value.large_image,
                                listGridImage: value.list_grid_image,
                                attributeNameId: el.id
                            })
                        })
                    )
                    await ProductInfoAttributeName.create({
                        productInfoId: productInfo.id,
                        attributeNameId: attrName.id
                    })
                })
            )

            product.warehouses = await Promise.all(
                product.warehouse_list.map(async el => {
                    const warehouse = await Warehouse.create({
                        name: el.warehouse,
                        price: el.warehouse_price
                    })
                    await WarehouseProductInfo.create({
                        warehouseId: warehouse.id,
                        productInfoId: productInfo.id
                    })
                })
            )

            product.images = await Promise.all(
                product.image_list.map(async el => {
                    await ProductImage.create({
                        home: el.home,
                        listGrid: el.list_grid,
                        grid: el.grid,
                        gallery: el.gallery,
                        view: el.view,
                        otherItems: el.other_items,
                        large: el.large,
                        productInfoId: productInfo.id,
                    })
                })
            )

            return res.json(product)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async createOrder(req, res, next) {
        try {
            const { addressId, orderId } = req.body

            return res.json({message: "Working"})
        } catch (err) {
            return next(ApiError.badRequest(err.message))
        }
    }
}

export const supplierController = new SupplierController()