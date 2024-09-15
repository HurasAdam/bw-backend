import express from "express";
import { authController } from "../controllers/authControllers";
import { authGuard } from "../middlewares/authHandler";
import { conversationReportController } from "../controllers/conversationReportsController";




const router = express.Router();

router.post("/add",authGuard,conversationReportController.addConversationReport);



export default router;