import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import connectToDb from "./config/db";
import routes from "./routes";

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use("/api",routes)





connectToDb(process.env.MONGO_URI as string).then(()=>{
    app.listen(PORT,()=> console.log(`Server is running on port:${PORT}`))
})