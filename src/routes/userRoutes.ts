import express from "express";

import { authGuard } from "../middlewares/authHandler";
import { userController } from "../controllers/userControllers";

const router = express.Router();

router.get("/me",authGuard, userController.getMyProfile);
router.get("/users",authGuard, userController.getUsers);


export default router;