import ApiError from '../errors/ApiError.mjs'
import * as crypto from 'node:crypto'

class SupplierController {

    async getToken(req, res, next) {
        try {
            const publicKey = process.env.SUPPLIER_KEY_PUBLIC
            const secretKey = process.env.SUPPLIER_KEY_SECRET
            const noncestr = crypto.randomBytes(16).toString('hex')
            const timestamp = Math.floor(Date.now()/1000)
            const signature = crypto.createHash('md5').update(
                `api_key=${publicKey}&api_secret=${secretKey}&noncestr=${noncestr}&timestamp=${timestamp}`
            ).digest('hex')

            const token = await fetch(
                `https://affapi.banggood.com/getAccessToken?api_key=${publicKey}&noncestr=${noncestr}&timestamp=${timestamp}&signature=${signature}`
            )
            console.log(`https://affapi.banggood.com/getAccessToken?api_key=${publicKey}&noncestr=${noncestr}&timestamp=${timestamp}&signature=${signature}`)
            return res.json({result: token})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

}

export const supplierController = new SupplierController()