import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/authRoute.js"
dotenv.config();
const app = express();
app.use(cors({ origin : "http://localhost:5173", credentials: true}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000
const __dirname = path.resolve();
app.use("/api/auth", authRoutes)
if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "../frontend/client/dist")))
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "..",  "frontend", "client",  "dist", "index.html"))
    })
}
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port`, PORT)
})