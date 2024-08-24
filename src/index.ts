import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import connectToDb from "./config/db";
const PORT = process.env.PORT

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get("/api/test", async(req:Request,res:Response)=>{
return res.status(200).json({message:"Hello world"})
});

connectToDb(process.env.MONGO_URI as string).then(()=>{
    app.listen(PORT,()=> console.log(`Server is running on port:${PORT}`))
})