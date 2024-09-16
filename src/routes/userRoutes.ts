import express from "express";

import { authGuard } from "../middlewares/authHandler";
import { userController } from "../controllers/userControllers";

const router = express.Router();

router.get("/me",authGuard, userController.getMyProfile);


export default router;