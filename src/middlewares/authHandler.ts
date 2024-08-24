import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import * as types from "../types/index";

declare global {
    namespace Express {
      interface Request {
        user?: {
          name: string;
          email:string;
          surname: string;
          isAdmin: boolean;
          userId: string;
          avatar?: string;
        };
      }
    }
  }

  export const authGuard = async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const token = req.cookies["auth_token"];
    
        if(!token){
            return res.status(401).json({message:"Authorization required"})
        }
        if(token){
         
    const token = req.cookies["auth_token"];
    const {id,isAdmin}= jwt.verify(token, process.env.JWT_SECRET_KEY as string) as jwt.JwtPayload;
    const user = await User.findById(id);
    
    if(!user){
        return res.status(404).json({message:"User not found"})
    }else{
        req.user={
            name:user?.name,
            email:user.email,
            surname:user?.surname,
            isAdmin:user.isAdmin,
            userId:id
        }
        next();
    }
    
        }        }catch(error){
            console.log(error);
            return res.status(401).json({message:"Authorization required"})
                    }
    }


export const adminGuard = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const user = await User.findById({_id:req.user?.userId});
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    if(user && !user.isAdmin){
        return res.status(401).json({message:"Not authorized as admin"})
    }else{
        next();
    }
    
    }catch(error){
    
    }
    
    }