// socket/socket.js
import { Server } from "socket.io";

const userSocketMap = {};

const getReceiverSocketId = (receiverID) => userSocketMap[receiverID];

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ User Connected:", socket.id);

    // Store the user ID and socket ID
    socket.on("addUser", (userId) => {
      console.log("User registered with socket:", userId, socket.id);
      console.log("Current socket map:", userSocketMap);
      userSocketMap[userId] = socket.id;
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected", socket.id);

      // Remove disconnected socket
      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
    });
  });
};

export { getReceiverSocketId, initSocket,io };
