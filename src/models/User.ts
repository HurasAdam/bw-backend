import {Schema,model} from "mongoose";

const userSchema = new Schema({
name:{type:String, required:true},
surname:{type:String, required:true},
email:{type:String, required:true},
isAdming:{type:Boolean, default:false},
isVerified:{type:Boolean, default:false},

},{timestamps:true});

const User = model("User",userSchema);
export default User;