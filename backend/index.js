import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
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
app.get("/", (req, res) => {
    res.send("Hello World!")
})
app.use("/api/auth", authRoutes)
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port`, PORT)
})