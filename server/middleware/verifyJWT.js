const JWT = require("jsonwebtoken")
const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers.Authorization || req.headers.authorization
    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json({message:"Unathorized"})
    }
    const token = authHeader.split(" ")[1]
    JWT.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decode)=>{
            if(err)
                return res.status(403).json({message:"Forbidden"})
            req.user = decode
            next()
        }
    )
}
module.exports = verifyJWT