import { NextFunction, Request, Response } from "express";
import Article from "../models/Article";
import User from "../models/User";
const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, clientDescription, employeeDescription, verifiedBy, tags } =
      req.body;
    const user = req.user;
    console.log(user);
    const article = await Article.findOne({ title });

    if (article) {
      return res
        .status(400)
        .json({ message: "Article with that title already exists" });
    }
    const createdTag = await Article.create({
      title,
      clientDescription,
      employeeDescription,
      verifiedBy: user?.userId,
      tags,
      createdBy: user?.userId,
    });
    res.status(200).json(createdTag);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pageSize = 15;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skipp = (pageNumber - 1) * pageSize;

    const articles = await Article.find({})
      .select([
        "-clientDescription",
        "-employeeDescription",
        "-createdBy",
        "-verifiedBy",
        "-createdAt",
        "-viewsCounter",
        "-__v",
      ])
      .populate([{ path: "tags", select: ["name"] }])
      .skip(skipp)
      .limit(pageSize);

    const total = await Article.countDocuments();

    const responseObject = {
      data: articles,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const article = await Article.findOne({ _id: id }).populate([
      { path: "tags", select: ["name"] },
      { path: "verifiedBy", select: ["name", "surname"] },
      { path: "createdBy", select: ["name", "surname"] },
    ]);

    if (!article) {
      return res.status(403).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const IncrementViewsCounter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const article = await Article.findOne({ _id: id });

    if (!article) {
      return res.status(403).json({ message: "Article not found" });
    }

    article.viewsCounter += 1;
    await article.save();

    res.status(200).json();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getFavouriteArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user;
    const pageSize = 15;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skipp = (pageNumber - 1) * pageSize;

    const user = await User.findById({ _id: currentUser?.userId }).select([
      "favourites",
    ]);

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    console.log(user);

    // const favorites = user?.favourites;
    // const favoritesList = await Article.find({ _id: { $in:favorites } });

    res.status(200).json("favorites");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const articleController = {
  createArticle,
  getAllArticles,
  getArticle,
  IncrementViewsCounter,
  getFavouriteArticles,
};
