import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId,io} from "../socket/socket.js";

// @desc Send a message and emit via socket
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const reciverId = req.params.id;
    const { message } = req.body;

    // Find or create a conversation
    let getConversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!getConversation) {
      getConversation = await Conversation.create({
        participants: [senderId, reciverId],
        messages: [],
      });
    }

    // Create new message
    const newMessage = await Message.create({
      senderId,
      reciverId,
      message,
    });

    // Link message to conversation
    getConversation.messages.push(newMessage._id);

    // Save both
    await Promise.all([
      getConversation.save(),
      newMessage.save()
    ]);

    // Emit real-time message to receiver
    const reciverSocketId = getReceiverSocketId(reciverId);
    
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("receive_message", newMessage);
    }

    // Optionally emit to sender too
    const senderSocketId = getReceiverSocketId(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("receive_message", newMessage);
    }

    return res.status(200).json({
      message: "Message sent successfully",
      newMessage,
    });

  } catch (error) {
    console.error("Error in sendMessage:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// @desc Get all messages in a conversation
export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const reciverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    }).populate("messages");

    return res.status(200).json(conversation?.messages || []);
  } catch (error) {
    console.error("Error in getMessage:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
