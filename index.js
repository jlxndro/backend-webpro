import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import BookRoute from "./routes/BookRoute.js"
import CategoryRoute from "./routes/CategoryRoute.js";
import db from "../config/Database.js"; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(BookRoute);
app.use(CategoryRoute);

app.listen(5000, ()=> console.log('Server Up and Running...'))