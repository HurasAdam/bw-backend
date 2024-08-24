import express from "express";
import { authController } from "../controllers/authControllers";
import { authGuard } from "../middlewares/authHandler";

const router = express.Router();

router.post("/register",authController.register);
router.post("/login",authController.login);
router.get("/validateToken",authGuard,authController.validateToken);

export default router;