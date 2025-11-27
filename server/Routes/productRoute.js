const express = require("express")
const router = express.Router()
const productController = require("../controllers/productController")
const verifyAdmin = require("../middleware/verifyAdmin")

router.get("/",productController.getAllProducts)
router.get("/:id",productController.getProductById)
router.use(verifyAdmin)
router.post("/",productController.addProduct)
router.delete("/:id",productController.deleteProduct)
router.put("/",productController.updateProduct)
module.exports = router