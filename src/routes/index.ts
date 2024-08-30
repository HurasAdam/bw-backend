import express from "express";
import authRoutes from "./authRoutes";
import tagRoutes from "./tagRoutes";
import articleRoutes from "./articleRoutes";
const router = express.Router();


router.use("/auth",authRoutes);
router.use("/tags",tagRoutes)
router.use("/articles",articleRoutes)


export default router;