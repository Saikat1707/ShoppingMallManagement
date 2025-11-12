import express from "express"
import dotenv from "dotenv"
import { connection } from "./config/dbConfig.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/userRouter.routes.js"
import shopRouter from "./routes/shopRouter.routes.js"
import saleRouter from "./routes/saleRouter.routes.js"
import productRouter from "./routes/productRouter.routes.js"
import offerRouter from "./routes/offerRouter.routes.js"
import employeeRouter from "./routes/employeeRouter.routes.js"
import bookingRouter from "./routes/bookingRouter.routes.js"

import morgan from "morgan"

dotenv.config()
connection()

const app = express()
app.use(morgan('dev'))

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true,                
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"], 
}));



app.use("/api/user",userRouter)
app.use("/api/shop",shopRouter)
app.use("/api/sale",saleRouter)
app.use("/api/product",productRouter)
app.use("/api/offer",offerRouter)
app.use("/api/employee",employeeRouter)
app.use("/api/booking",bookingRouter)

const port = process.env.PORT || 4000
app.listen(port,(req,res)=>{
    console.log(`server is connected to port ${port}`)
})