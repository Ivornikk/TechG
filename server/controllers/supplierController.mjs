import ApiError from '../errors/ApiError.mjs'

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

}

export const supplierController = new SupplierController()