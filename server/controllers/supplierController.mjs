import ApiError from '../errors/ApiError.mjs'
import models from '../models/models.mjs'

const {Category} = models

class SupplierController {

    async getToken(req, res, next) {
        try {
            const publicKey = process.env.SUPPLIER_KEY_PUBLIC
            const secretKey = process.env.SUPPLIER_KEY_SECRET

            const response = await fetch(
                `https://affapi.banggood.com/getAccessToken?app_id=${publicKey}&app_secret=${secretKey}`
            )
            const token = await response.json()
            return res.json(token)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async UpdateCategories(req, res, next) {
        try {
            const {Access_token} = req.body
            await Category.destroy({
                where: {},
                truncate: true
            })
            const categories = await fetch(
                `https://api.banggood.com/category/getCategoryList?access_token=${Access_token}&page=1&lang=en`
            )
            categories = await categories.json()
            await Promise.all(
                categories.cat_list.map(async category => {
                    await Category.create({
                        id: category.cat_id,
                        name: category.cat_name,
                        parent_id: category.parent_id
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