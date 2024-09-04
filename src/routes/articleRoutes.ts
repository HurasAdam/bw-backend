import express from "express";
import { articleController } from "../controllers/articleControllers";
import { authGuard } from "../middlewares/authHandler";

const router = express.Router();

router.post("/create", authGuard, articleController.createArticle);
router.get("/", authGuard, articleController.getAllArticles);
router.get("/article/:id", authGuard, articleController.getArticle);
router.post(
  "/article/:id/increment-views",
  authGuard,
  articleController.IncrementViewsCounter
);

router.put(
  "/article/edit/:id",
  authGuard,
  articleController.updateArticle
);
router.get("/favourites", authGuard, articleController.getFavouriteArticles);

export default router;
