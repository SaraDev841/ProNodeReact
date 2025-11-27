const mongoose = require("mongoose")
const basketSchem = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"

    },
    productId:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Products"
    },
    quantity:
    {
        type: Number,
        default: 1
    }
 
}, { timestamps: true })
module.exports = new mongoose.model("Basket", basketSchem)