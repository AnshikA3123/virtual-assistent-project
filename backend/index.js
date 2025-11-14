import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import UserRouter from "./routes/User.routes.js"
import geminiResponse from "./gemini.js"




const app = express()
const port = process.env.PORT ||8000

// CORS configuration - allow GitHub Pages origin
// Hardcoded production frontend URL as fallback
const allowedOrigins = [
    process.env.FRONTEND_URL || "https://anshika3123.github.io",
    "https://anshika3123.github.io",
    "https://AnshikA3123.github.io",
    "http://localhost:5173" // For local development
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Normalize origin (remove trailing slash and path)
        const normalizedOrigin = origin.replace(/\/+$/, '').split('/').slice(0, 3).join('/');
        
        // Check if normalized origin matches any allowed origin
        const isAllowed = allowedOrigins.some(allowed => {
            const normalizedAllowed = allowed.replace(/\/+$/, '').split('/').slice(0, 3).join('/');
            return normalizedOrigin === normalizedAllowed;
        });
        
        if (isAllowed) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin, 'Normalized:', normalizedOrigin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
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