import {model,Schema} from "mongoose";

const articleSchema = new Schema({
    title:{type:String, required:true},
    employeeDescription:{type:String},
    createdBy:{type:Schema.Types.ObjectId, ref:"User", required:true},
    tags:{type:Schema.Types.ObjectId, ref:"Tag", required:true,},
    clientResponse:{type:String, required:true},
verified:{
    isVerified:{type:Boolean, required:true, default:false},
    verifiedBy:{type:Schema.Types.ObjectId, ref:"User", required:true,}
}
},{timestamps:true});


const Article = model("Article",articleSchema);
export default Article;
