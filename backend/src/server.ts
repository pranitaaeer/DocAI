import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieparser from "cookie-parser"
import DBConnect from "./config/db.js"
dotenv.config()
 await DBConnect()

const app=express()
const PORT=process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use(cors({
    origin:"https://doc-ai-wheat.vercel.app",
    credentials:true
}))


app.get("/",(req,res)=>{
    res.send("app is working...")
})

import authRouter from "./routes/auth.route.js"
import documentRouter from "./routes/document.route.js"
import chatRouter from "./routes/chat.route.js"

app.use("/auth",authRouter)
app.use("/doc",documentRouter)
app.use("/chat",chatRouter)

app.listen(PORT,()=>{
 console.log(`app is running on : ${PORT}`)
})
