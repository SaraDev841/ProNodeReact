const mongoose = require("mongoose")
const productSchem = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
         type:String
    },
    price:{
         type:Number,
         required:true
    },
    image:{
        type:String,
        required:true
    },
    inventoryStatus:{
        type:String,
        required:true,
        enum:['INSTOCK','OUTOFSTOCK','LOWSTOCK'],
        default:'INSTOCK',
        set: v => v.toUpperCase()
    },
    category:{
        type:String,
    },
    summary:{
        type:String,
    }
},{timestamps:true})
module.exports = mongoose.model("Products",productSchem)