import express from "express";
import authRoutes from "./authRoutes";
import tagRoutes from "./tagRoutes";
const router = express.Router();


router.use("/auth",authRoutes);
router.use("/tags",tagRoutes)


export default router;