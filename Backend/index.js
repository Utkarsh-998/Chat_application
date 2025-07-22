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

// ✅ Allow both local and deployed frontend
const allowedOrigins = [
  "http://localhost:5173"
  // "https://chat-application-fronted.onrender.com"
];

app.use(cors({
<<<<<<< HEAD
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
=======
   origin:[ "http://localhost:5173", "https://chat-app-t7q5.onrender.com"],
  credentials: true
>>>>>>> 2fea22a267d9bea25bec039503004d7a6da7acd7
}));

// Optional: Log origin for debugging
app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});

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
