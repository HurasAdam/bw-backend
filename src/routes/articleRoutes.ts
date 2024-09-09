import express from "express";
import { articleController } from "../controllers/articleControllers";
import { authGuard } from "../middlewares/authHandler";

const router = express.Router();

router.post("/create", authGuard, articleController.createArticle);
router.get("/", authGuard, articleController.getAllArticles);
router.get("/search", authGuard, articleController.searchArticleByFilters);
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
router.post("/article/:id/verify",authGuard, articleController.verifyArticle);
router.post("/article/:id/add-favourite",authGuard, articleController.markArticleAsFavorite)
export default router;
