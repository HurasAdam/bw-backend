import express from "express";
import { authController } from "../controllers/authControllers";
import { authGuard } from "../middlewares/authHandler";
import { conversationTopicController } from "../controllers/conversationTopicsController";



const router = express.Router();

router.post("/create",conversationTopicController.createConversationTopic);
router.get("/",conversationTopicController.getAllTopics);
router.delete("/delete/:id",conversationTopicController.deleteConversationTopic);


export default router;