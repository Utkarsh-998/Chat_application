import mongoose from "mongoose";

const conversationModel=new mongoose.Schema({
     participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        required:true

    }]
},{timestamps:true})
export const Conversation=mongoose.model("Conversation",conversationModel)