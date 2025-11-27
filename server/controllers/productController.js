const Product = require("../models/Product")

const getAllProducts = async(req,res)=>{
    const products = await Product.find()
    res.json(products)
}

const getProductById = async(req,res)=>{
   const {id} = req.params 
   const findProduct = await Product.findById(id).lean()
   res.json(findProduct)
}

const addProduct = async(req,res)=>{
    const {name,description,price,image,category,inventoryStatus,summary} = req.body
    if(!name || !price || !image){
        return res.status(400).json({message:"All Fileds Are Required"})
    }
   const newProduct =  await Product.create({name,description,price,image,category,inventoryStatus,summary})
   res.json({message:"Add Pruduct To DB",
    product:newProduct
   })
}

const updateProduct = async(req,res)=>{
    const {idProduct,name,description,price,image,category,inventoryStatus,summary} = req.body
    if(!idProduct){
        return res.status(400).json({message:"Id Of Product Is Required"})
    }
    const findProduct = await Product.findById(idProduct).exec()
    if(!findProduct){
        return res.send("Product Not Exist In DB")
    }
    findProduct.name = name
    findProduct.description = description
    findProduct.price = price
    findProduct.image = image
    findProduct.category = category
    findProduct.inventoryStatus = inventoryStatus
    findProduct.summary = summary
    const saveProduct = await findProduct.save()
    res.json({message:"Update Product Successfully!!" ,Product:saveProduct})
}

const deleteProduct = async(req,res)=>{
    const {id} = req.params
    const product = await Product.findById(id).lean()
    await Product.deleteOne(product)
    res.send(`Product : ${product.name} Removed Successfully!!`)
}

module.exports = {getAllProducts,getProductById,addProduct,updateProduct,deleteProduct}