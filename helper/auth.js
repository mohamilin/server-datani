require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    auth: (req, res, next) => {
        const userHeader = req.headers.authorization
        const token = userHeader.split(" ")[1]
        if(token == null) return res.json('not match or empty')

        try {
            const isTokenValid = jwt.verify(token, process.env.SECRET_KEY)
            if(isTokenValid) {
                let {password, ...rest} = isTokenValid;
                req.body = rest
                next()
            }
        } catch (error) {
            res.json("token invalid");
        }
    }
}