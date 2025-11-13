import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import UserRouter from "./routes/user.routes.js"
import geminiResponse from "./gemini.js"




const app = express()
const port = process.env.PORT ||8000

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user", UserRouter);

//app.get("/",async (req,res)=>{
    //let prompt=req.query.prompt;
    //let data =await geminiResponse(prompt);
    //res.json(data);
//});


app.listen(port,()=>{
    connectDb()
    console.log("Server Started")
})