import express from "express";
import authRoutes from "./authRoutes";
import tagRoutes from "./tagRoutes";
import articleRoutes from "./articleRoutes";
import conversationTopicRoutes from "./conversationTopicRoutes";
import conversationReportRoutes from "./conversationReportRoutes";
const router = express.Router();


router.use("/auth",authRoutes);
router.use("/tags",tagRoutes);
router.use("/articles",articleRoutes);
router.use("/conversation-topics",conversationTopicRoutes);
router.use("/conversation-report",conversationReportRoutes);


export default router;