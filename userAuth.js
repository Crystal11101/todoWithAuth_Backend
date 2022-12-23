import jwt from "jsonwebtoken"

export function userAuth(req, res, next) {
    const token = req.cookies.token
    // console.log(token)
    try {
        if (token == null) {
            return res.sendStatus(401)
        }
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
        })
    } catch (err) {
        // console.log('1')
        return res.send(err.message)
    }
    next()
}

export default userAuth