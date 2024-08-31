import { NextFunction, Request, Response } from "express";
import Article from "../models/Article";
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

export const articleController = {
  createArticle,
  getAllArticles,
};
