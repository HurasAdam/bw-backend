import express from "express";
import { articleController } from "../controllers/articleControllers";
import { authGuard } from "../middlewares/authHandler";


const router = express.Router();

router.post("/create", articleController.createArticle);



export default router;