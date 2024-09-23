import { NextFunction,Request,Response } from "express";
import ConversationTopic from "../models/ConversationTopic";

const createConversationTopic = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, description } = req.body;
      const user = req.user;
      console.log(user);
      const topic = await ConversationTopic.findOne({ title });
  
      if (topic) {
        return res
          .status(400)
          .json({ message: "Topic with that title already exists" });
      }
      const createdTopic = await ConversationTopic.create({
        title,
    description
      });

      if(createdTopic){
return   res.status(200).json({message:"Temat rozmowy został dodany"});
      }
    
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  const getAllTopics = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
const topics = await ConversationTopic.find({});

res.status(200).json(topics);
    
    } catch (error) {
      console.log(error);
      next(error);
    }
  };



  const deleteConversationTopic= async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id}= req.params;

const topic = await ConversationTopic.findById({_id:id});



if(!topic){
    return res.status(400).json({message:"Conversation topic not found"});
};

const deletedTopic = await ConversationTopic.findByIdAndDelete({_id:id});

if(deletedTopic){
    return res.status(200).json({message:"Temat rozmowy został usunięty"})
}
  
  }catch(error){
    console.log(error);
    next(error);
}
}







  
export const conversationTopicController = {
  createConversationTopic,
  getAllTopics,
  deleteConversationTopic
};
