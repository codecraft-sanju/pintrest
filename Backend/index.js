import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import pinRoutes from './routes/pinRoutes.js';
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 5000;

dotenv.config();

cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API,
    api_secret:process.env.CLOUD_SECRET
})

// app.get('/',(req,res)=>{
//     res.send("Hello")
// })

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())


// routes
app.use('/api/user',userRoutes);
app.use('/api/pin',pinRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,"/Frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"Frontend","dist","index.html"))
})

// server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDb();
})