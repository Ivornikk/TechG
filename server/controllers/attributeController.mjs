import ApiError from "../errors/ApiError.mjs"
import models from "../models/models.mjs"

const {Attribute} = models

class AttributeController {

    async create(req, res, next) {
        try {
            const { name, groupId } = req.body

            const attribute = await Attribute.create({
                name, groupId
            })

            return res.json(attribute)
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async getByGroup(req, res, next) {
        try {
            const {groupId} = req.query

            const attributes = await Attribute.findAll({
                where: {groupId}
            })

            return res.json(attributes)
        } catch(err) {
            next(ApiError.badRequest(err.message))
        }
    }

    async deleteAttribute(req, res, next) {
        try {
            const {id} = req.body

            const deleteCount = Attribute.destroy({
                where: {id}
            })

            if (deleteCount) return res.json({message: 'Success!'})
            else return res.json({message: 'Failure!'})
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

export default new AttributeController()