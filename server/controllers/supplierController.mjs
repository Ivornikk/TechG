import ApiError from '../errors/ApiError.mjs'
import models from '../models/models.mjs'
import fetch from 'node-fetch'
import syncProducts from '../syncOpenSearch.mjs'

const {Category, Product} = models

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