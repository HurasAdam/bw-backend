import { NextFunction, Request,Response } from "express";
import Tag from "../models/Tag";
 const createTag= async(req:Request,res:Response,next:NextFunction)=>{
    try{
const {name}=req.body;
const tag = await Tag.findOne({name});

console.log(tag)

if(tag){
    return res.status(400).json({message:"Tag already exists"})
}
const createdTag = await Tag.create({
    name
})
res.status(200).json(createdTag);
    }catch(error){
        console.log(error);
        next(error);
    }
};


const getAllTags= async(req:Request,res:Response,next:NextFunction)=>{
    try{
const tags= await Tag.find({});


res.status(200).json(tags);
    }catch(error){
        console.log(error);
        next(error);
    }
} 




export const tagController ={
    createTag,
    getAllTags
}