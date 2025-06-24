import models from "../models/models.mjs"
const {Address} =  models

class AddressController {
    async getAll(req, res, next) {
        res.json({message: "Working address get all"})
    }
    async getOne(req, res, next) {
        res.json({message: "Working address get one"})
    }
    async create(req, res, next) {
        res.json({message: "Working address create"})
    }
    async remove(req, res) {

    }
    async edit(req, res, next) {

    }
}

export default new AddressController()