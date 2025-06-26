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
    async getOne(req, res, next) {
        const {id} = req.params
        try {
            const address = await Address.findOne({where: {id}})
            return res.json(address)
        }
        catch (err) {
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
            ZipCode
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
                ZipCode: ZipCode
            })
            return res.json(address)
        }
        catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
    async remove(req, res) {
        const {id} = req.params
        const deleteCount = Address.destroy({where: id})
        if (deleteCount) return res.json({"message": "Success!"})
        else return res.json({"message": "Failure!"})
    }

    async edit(req, res, next) {

    }
}

export default new AddressController()