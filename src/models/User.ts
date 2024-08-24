import {Schema,model} from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as types from "../types/index";

const userSchema = new Schema({
name:{type:String, required:true},
surname:{type:String, required:true},
email:{type:String, required:true},
isAdmin:{type:Boolean, default:false},
isVerified:{type:Boolean, default:false},
password:{type:String, required:true},
avatar:{type:String},
team:{type:Schema.Types.ObjectId, ref:"Team"}

},{timestamps:true});


userSchema.pre("save", async function (next) {
    if (this.isDirectModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
      return next();
    }
    return next();
  });


userSchema.methods.generateJWT = async function():Promise<string>{
    return await jsonwebtoken.sign({id:this._id,role:this.isAdmin},process.env.JWT_SECRET_KEY as string,{
        expiresIn:"30d"
    })
}
userSchema.methods.comparePassword = async function(enteredPassword:string):Promise<boolean>{
    return await bcrypt.compare(enteredPassword,this.password);
}



const User = model<types.IUserDocument>("User",userSchema);
export default User;