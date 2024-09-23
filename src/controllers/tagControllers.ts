import { NextFunction, Request,Response } from "express";
import Tag from "../models/Tag";
 const createTag= async(req:Request,res:Response,next:NextFunction)=>{
    try{
const {name,shortname}=req.body;
const tag = await Tag.findOne({shortname});



if(tag){
    return res.status(400).json({message:"Tag already exists"})
}
const createdTag = await Tag.create({
    name,shortname
});

if(createdTag){
   return res.status(200).json({message:"Tag został dodany"});
}

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

const updateTag= async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id}= req.params;
const {name,shortname}=req.body;
const tag = await Tag.findById({_id:id});



if(!tag){
    return res.status(400).json({message:"Tag not found"});
};

tag.name = name || tag.name;
tag.shortname = shortname || tag.shortname;

const updatedTag = await tag.save();

if(updatedTag){
    return res.status(200).json({message:"Tag został zaktualizowany"})
};


    }catch(error){
        console.log(error);
        next(error);
    }
};



const deleteTag= async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id}= req.params;

const tag = await Tag.findById({_id:id});



if(!tag){
    return res.status(400).json({message:"Tag not found"});
};

const deletedTag = await Tag.findByIdAndDelete({_id:id});

if(deletedTag){
    return res.status(200).json({message:"Tag został usunięty"})
}




    }catch(error){
        console.log(error);
        next(error);
    }
};


export const tagController ={
    createTag,
    getAllTags,
    updateTag,
    deleteTag
}