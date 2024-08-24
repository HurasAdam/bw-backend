import {model,Schema} from "mongoose";

const tagSchema = new Schema({
    name:{type:String, required:true},
    
});

const Tag = model("Tag",tagSchema);
export default Tag;
