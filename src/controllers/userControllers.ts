import { Request,Response,NextFunction } from "express";
import User from "../models/User";


const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {


      const users = await User.find({}).select(["name","surname"]);



    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const getMyProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

  
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };



  export const userController = {
    getMyProfile,
    getUsers
  }