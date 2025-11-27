const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/Users")

const login = async(req,res)=>{
    const {userName,password} = req.body
    if(!userName ||!password){
         return res.status(400).json({message:"All Fields Are Required"})
    }
    const user = await User.findOne({userName}).lean()
    if(!user || !user.active){
        return res.status(401).json({message:"Unathorized"})
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
       return res.status(401).json({message:"Unathorized"})
    }
 
    const userInfo ={
        _id:user._id,
        userName:user.userName,
        role:user.role,
        fullName:user.fullName,
        email:user.email
    }

    const token = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({token})
}

const register = async(req,res)=>{
    const {userName,password,fullName,phone,email} = req.body
    if(!userName || !password || !fullName ||!email){
        return res.status(400).json({message:"All Fields Are Required"})
    }
    const duplicateUser = await User.findOne({userName}).lean()
    if(duplicateUser){
        return res.status(409).json({message:"Duplicate User"})
    }
    const hashPass = await bcrypt.hash(password,10)
    const newUser = await User.create({userName,password:hashPass,fullName,phone,email})
    if(!newUser){
         res.send(400).json({message:"Bad Request"})
    }
    res.json({message:`User ${newUser.fullName} created`})

}

module.exports = {login,register}