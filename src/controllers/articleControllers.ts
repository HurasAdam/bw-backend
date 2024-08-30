import { NextFunction, Request,Response } from "express";
import Article from "../models/Article";
 const createArticle= async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const { title, clientResponse, employeeDescription, verifiedBy, tags, createdBy }=req.body;

const article = await Article.findOne({title});

console.log(article)

if(article){
    return res.status(400).json({message:"Article with that title already exists"})
}
const createdTag = await Article.create({
    title,clientResponse,employeeDescription,verifiedBy,tags,createdBy
})
res.status(200).json(createdTag);
    }catch(error){
        console.log(error);
        next(error);
    }
};


const getAllArticles= async(req:Request,res:Response,next:NextFunction)=>{
    try{
const tags= await Article.find({});


res.status(200).json(tags);
    }catch(error){
        console.log(error);
        next(error);
    }
} 




export const articleController ={
    createArticle,
    getAllArticles
}