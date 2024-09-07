import { NextFunction, Request, Response } from "express";
import Article from "../models/Article";
import User from "../models/User";
import { constructSearchQuery } from "../utils";
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

    const query = constructSearchQuery(req.query);


    const pageSize = 15;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skipp = (pageNumber - 1) * pageSize;
    const sortBy = req.query.sortBy ? req.query.sortBy.toString() : '-createdAt';
    const articles = await Article.find(query)
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
      .limit(pageSize)
      .sort(sortBy); 

    const total = await Article.countDocuments(query);

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
    const pageSize = 15; // Liczba wyników na stronę
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
    const skip = (pageNumber - 1) * pageSize;

    // Znalezienie użytkownika na podstawie ID i pobranie ulubionych artykułów
    const user = await User.findById(currentUser?.userId).select("favourites");

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Wyciągnięcie tablicy ID artykułów z ulubionych
    const favourites = user.favourites;

    // Pobranie artykułów na podstawie ID w ulubionych z paginacją
    const favouriteArticles = await Article.find({ _id: { $in: favourites } }).select([
      "-clientDescription",
      "-employeeDescription",
      "-createdBy",
      "-verifiedBy",
      "-createdAt",
      "-viewsCounter",
      "-__v",
    ]).populate([{ path: "tags", select: ["name"] }])
      .skip(skip)
      .limit(pageSize);

    // Jeśli chcesz, możesz również zwrócić całkowitą liczbę ulubionych artykułów, aby obsłużyć paginację na froncie
    const totalFavouriteArticles = await Article.countDocuments({ _id: { $in: favourites } });

    res.status(200).json({
      data:favouriteArticles,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalFavouriteArticles / pageSize),
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};




const updateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { title, clientDescription, employeeDescription, verifiedBy, tags } =
    req.body;
console.log(req.body)
    const article = await Article.findOne({ _id: id });

    if (!article) {
      return res.status(403).json({ message: "Article not found" });
    }
    article.title = title || article.title
    article.clientDescription = clientDescription || article.clientDescription
    article.employeeDescription = employeeDescription || article.employeeDescription
    article.tags = tags || article.tags

 const updatedArticle = await article.save();

 if(updatedArticle){
  res.status(200).json(updatedArticle);
 }
   
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const searchArticleByFilters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user;
const query = constructSearchQuery(req.query);

const filteredArticles = await Article.find(query)


  res.status(200).json(filteredArticles);
 
   
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
  updateArticle,
  searchArticleByFilters
};
