class UserController {
    async registration(req, res, next) {
        res.json({message: "Working user auth"})
    }

    async login(req, res, next) {
        res.json({message: "Working user login"})
    }
 
    async check(req, res, next) {
        res.json({message: "Working user auth"})
    }
}

export default new UserController()