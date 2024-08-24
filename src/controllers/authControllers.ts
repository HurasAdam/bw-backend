import {Request,Response} from "express";

const register = async(req:Request,res:Response)=>{
try{
const {name,surname,email,password}=req.body;
console.log(req.body);
res.status(200).json({message:"Account has been created"});
}catch(error){
    console.log(error);
    return res.status(400).json({message:"Invalid user data"});
}
}


export const authController ={
    register,
}