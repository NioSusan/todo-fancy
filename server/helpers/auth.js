const jwt = require('jsonwebtoken')

const auth = (roles) => {
    return function (req, res, next) {
        let token = req.headers.token
        if(token){
            let decoded = jwt.verify(token,process.env.SECRET_KEY)
            if(decoded){
                if(roles.includes(decoded.role)){
                    next()
                 }else{
                    res.status(401).json({
                    msg : "you can't access this route/api. Please provide a valid token"
                    })
                }
            }
        }else{
            res.status(401).json({
                msg : "you are not authorized to access this route. Please provide a valid token."
             })
        }
    }
}

module.exports =  auth