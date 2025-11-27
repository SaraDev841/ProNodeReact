const Basket = require("../models/Basket")

const myBasket = async (req, res) => {
    const { _id } = req.user
    const products = await Basket.find({ userId: _id }, { _id: 0, quantity: 1 }).populate("productId")
    if (products.length === 0)
        res.send("Your Basket Is Empty")
    // const result = products.map((item)=> ({
    //   name: item.productId.name,
    //   price: item.productId.price,
    //   description: item.productId.description,
    //   image: item.productId.image,
    //   quantity: item.quantity,
    //   category:item.productId.category,
    //   inventoryStatus:item.productId.inventoryStatus,
    //   _id:item.productId._id
    // }))
    const result = products.map((item) => {
        if (!item.productId) {
            return {
                name: " מצטערים :( המוצר הוסר מהמערכת ",
                price: "N/A",
                image: "outOfStock.jpg",
                quantity: 0,
                note: "המוצר כבר לא זמין במלאי או נמחק",
            };
        }

        return {
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
            quantity: item.quantity,
            description: item.productId.description,
            category: item.productId.category,
            inventoryStatus: item.productId.inventoryStatus,
            _id: item.productId._id
        };
    });
    res.json(result)
}

const addFirst = async (req, res) => {
    const { _id } = req.user
    const { productId } = req.params
    if (!productId) {
        return res.status(400).json({ message: "Product Id Required" })
    }
    const findP = await Basket.findOne({ userId: _id, productId: productId }).lean()
    if (findP) {
        return res.status(400).json({ message: "המוצר כבר קיים בסל", exists: true })
    } else {
        await Basket.create({ userId: _id, productId: productId })
        return res.json({ message: "Product Adder To Basket Successfully:)" })
    }
}
const count = async (req, res) => {
    const { _id } = req.user
    const products = await Basket.find({ userId: _id }, { quantity: 1 }).populate("productId")
    let count = 0;
    // products.map((p)=>count+=p.quantity)
    for (let i = 0; i < products.length; i++) {
        if (products[i].productId != null)
            count += products[i].quantity
    }
    res.json({ count, products })
}
const addToBasket = async (req, res) => {
    const { _id } = req.user
    const { productId } = req.params
    if (!productId) {
        return res.status(400).json({ message: "Product Id Required" })
    }
    const findP = await Basket.findOne({ userId: _id, productId: productId })
    if (findP) {
        findP.quantity += 1
        await findP.save()
    }
    else {
        res.send("product not existed on your basket")
    }
    const allBasket = await Basket.find({ userId: _id }, { _id: 0, quantity: 1 }).populate("userId", { fullName: 1, _id: 0 }).populate("productId", { name: 1, _id: 0 })
    res.json({ message: "Product Add To Basket", allBasket })
}

const decreaseFromBasket = async (req, res) => {
    const { _id } = req.user
    const { productId } = req.params
    if (!productId) {
        return res.status(400).json({ message: "Product Id Required" })
    }
    const findP = await Basket.findOne({ userId: _id, productId: productId })
    if (findP) {
        if (findP.quantity > 1) {
            findP.quantity -= 1
            await findP.save()
        }
        else if (findP.quantity === 1) {
            await Basket.deleteOne(findP)
        }

    }
    else {
        res.send("Product Not On Basket")
    }
    const allBasket = await Basket.find({ userId: _id }, { _id: 0, quantity: 1 }).populate("userId", { fullName: 1, _id: 0 }).populate("productId", { name: 1, _id: 0 })
    res.json({ message: "Product Decreased From Basket", allBasket })
}

const removeFromBasket = async (req, res) => {
    const { _id } = req.user
    const { productId } = req.params
    const find = await Basket.findOne({ userId: _id, productId }).lean()
    if (!find) {
        return res.status(400).json({ message: "Not Exist On Basket" })
    }
    await Basket.deleteOne(find)
    res.json({ message: "Product Removed Successfuly" })
}

const updateProductInBasket = async (req, res) => {
    const { _id } = req.user
    const { productId, quantity } = req.body
    const find = await Basket.findOne({ userId: _id, productId }).exec()
    if (!find) {
        return res.status(400).json({ message: "Not Exist On Basket" })
    }
    if (quantity > 0) {
        find.quantity = quantity
        await find.save()

    } else {
        await Basket.deleteOne(find)
    }

    res.send("Update Successfully")
}

module.exports = { addToBasket, removeFromBasket, updateProductInBasket, myBasket, decreaseFromBasket, addFirst, count }
