import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectToDb from "./config/db";
import routes from "./routes";
import { errorResponseHandler,invalidPathHandler } from "./middlewares/errorHandler";

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));

app.use("/api",routes)
app.use(invalidPathHandler);
app.use(errorResponseHandler);




connectToDb(process.env.MONGO_URI as string).then(()=>{
    app.listen(PORT,()=> console.log(`Server is running on port:${PORT}`))
})