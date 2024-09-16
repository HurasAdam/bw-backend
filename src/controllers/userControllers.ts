import { Request,Response,NextFunction } from "express";


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
    getMyProfile
  }