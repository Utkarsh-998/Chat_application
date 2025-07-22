import express from "express";
import dotenv from "dotenv";
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { initSocket } from "./socket/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // attach socket here

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  // origin: "http://localhost:5173",
  origin:"https://chat-app-t7q5.onrender.com"
  credentials: true
}));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Start Server + Socket
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
  initSocket(server); // 🔌 Initialize socket.io here with the server
});
