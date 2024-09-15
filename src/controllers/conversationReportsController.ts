import { NextFunction,Request,Response } from "express";
import ConversationTopic from "../models/ConversationTopic";
import Conversation from "../models/Conversation";

const addConversationReport = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { topicId, note } = req.body;
      const user = req.user;
      console.log(user);
      const topic = await ConversationTopic.findById({_id:topicId})
  
      if (!topic) {
        return res
          .status(400)
          .json({ message: "Topic not found" });
      }
      const createdReport = await Conversation.create({
        topicId,
    note,
    createdBy:user?.userId
      });

      if(createdReport){
return   res.status(200).json({message:"Temat rozmowy został odnotowany"});
      }
    
    } catch (error) {
      console.log(error);
      next(error);
    }
  };



  
export const conversationReportController = {
    addConversationReport,

};
