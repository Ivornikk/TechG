import models from "../models/models.mjs"
import ApiError from "../errors/ApiError.mjs"
const {Address} =  models

class AddressController {
    async getAll(req, res, next) {
        try {
            const addresses = await Address.findAndCountAll()
            return res.json(addresses)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async getByUser(req, res, next) {
        const {userId} = req.params
        try {
            const addresses = await Address.findAndCountAll({where: {userId: userId}})
            return res.json(addresses)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async create(req, res, next) {
        const {
            firstName,
            lastName,
            telephone,
            addressLine,
            country,
            region,
            city,
            ZipCode,
            userId
        } = req.body
        
        try {
            const address = await Address.create({
                firstName: firstName,
                lastName: lastName,
                telephone: telephone,
                addressLine: addressLine,
                country: country,
                region: region,
                city: city,
                ZipCode: ZipCode,
                userId: userId
            })
            return res.json(address)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res) {
        const {id} = req.body
        const deleteCount = Address.destroy({where: {id: id}})
        if (deleteCount) return res.json({"message": "Success!"})
        else return res.json({"message": "Failure!"})
    }

    async edit(req, res, next) {

    }
}

export default new AddressController()