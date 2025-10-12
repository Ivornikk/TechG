import ApiError from '../errors/ApiError.mjs'
import models from '../models/models.mjs'
import fetch from 'node-fetch'

const {Category} = models

class SupplierController {

    async getToken(req, res, next) {
        try {
            const params = new URLSearchParams({
                app_id: process.env.SUPPLIER_KEY_PUBLIC,
                app_secret: process.env.SUPPLIER_KEY_SECRET,
            });
            const address = `https://affapi.banggood.com/getAccessToken?${params.toString()}`
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
                let res = await fetch(
                    `https://api.banggood.com/category/getCategoryList?access_token=${Access_token}&page=${page}&lang=en`
                )
                categories.cat_list = [...categories.cat_list, ...res.cat_list]
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

}

export const supplierController = new SupplierController()