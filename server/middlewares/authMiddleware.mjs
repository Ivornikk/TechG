import jwt from 'jsonwebtoken'
import { parse } from 'cookie'

export default function(req, res, next) {
    if (req.method === 'OPTIONS') return next()

    try {
        const cookies = parse(req.headers.cookie || '')
        const token = cookies.token
        
        if (!token)
            res.status(401).json({message: "Not authenticated"})
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch(err) {
        res.status(401).json({message: "Not authenticated"})
    }
}