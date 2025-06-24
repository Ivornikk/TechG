import models from "../models/models.mjs"
const {Address} =  models

class AddressController {
    async getAll(req, res, next) {
        res.json({message: "Working basket get all"})
    }
    async getOne(req, res, next) {
        res.json({message: "Working basket get one"})
    }
    async create(req, res, next) {
        res.json({message: "Working basket create"})
    }
    async remove(req, res) {

    }
}

export default new AddressController()