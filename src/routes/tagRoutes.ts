import express from "express";
import { authController } from "../controllers/authControllers";
import { authGuard } from "../middlewares/authHandler";
import { tagController } from "../controllers/tagControllers";

const router = express.Router();

router.post("/create",tagController.createTag);
router.get("/",tagController.getAllTags)


export default router;