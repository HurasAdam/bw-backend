import mongoose from "mongoose";

const connectToDb = async(dbURI:string)=>{
try{
await mongoose.connect(dbURI)
}catch(error){
    console.log(`DB connection error : ${error}`);
    process.exit(1);
}
}

export default connectToDb;