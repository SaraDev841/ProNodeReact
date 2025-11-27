const express = require("express")
const router = express.Router()
const basketController = require("../controllers/basketController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
 
router.get("/",basketController.myBasket)
router.get("/count",basketController.count)
router.put("/:productId",basketController.addToBasket)
router.delete("/:productId",basketController.removeFromBasket)
router.put("/",basketController.updateProductInBasket)
router.put("/decrease/:productId",basketController.decreaseFromBasket)
router.post("/first/:productId",basketController.addFirst)
module.exports = router

