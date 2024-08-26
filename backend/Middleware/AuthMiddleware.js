const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req,res,next) =>{
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token , "secret-key" , (err,decodedToken)=>{
            if(err){
                console.log(err)
                res.redirect('/login')
            }else{
                next()
            }
        })
    }else{
        res.redirect('/login')
    }
}
exports.jwtAuthMiddleware = jwtAuthMiddleware