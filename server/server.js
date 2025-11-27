require("dotenv").config()
const express = require("express")
const corsOptions = require("./config/corsOptions")
const conectDB = require("./config/dbConn")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 8900 

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
conectDB() 

app.use("/api/user",require("./Routes/userRoute"))
app.use("/api/product",require("./Routes/productRoute"))
app.use("/api/basket",require("./Routes/basketRouter"))

mongoose.connection.once('open',()=>{
    console.log("Connect to mongoDB");
    app.listen(PORT,()=>{
        console.log(`Server Running On Port ${PORT}`);
    })
    
})

mongoose.connection.on('error',err=>{
    console.log(err + "error");
    
})