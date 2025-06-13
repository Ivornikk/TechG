class ProductController {
    async getAll(req, res, next) {
        res.json({message: "Working product get all"})
    }
    async getOne(req, res, next) {
        res.json({message: "Working product get one"})
    }
    async create(req, res, next) {
        res.json({message: "Working product create"})
    }
}

export default new ProductController()