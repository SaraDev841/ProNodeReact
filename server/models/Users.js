const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowecase:true
    },
    password:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","User"],
        default:"User"
    },
    active:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)