import express from "express";
import { articleController } from "../controllers/articleControllers";
import { authGuard } from "../middlewares/authHandler";

const router = express.Router();

router.post("/create", authGuard, articleController.createArticle);
router.get("/", authGuard, articleController.getAllArticles);

export default router;
