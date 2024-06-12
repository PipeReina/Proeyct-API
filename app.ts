import * as dotenv from "dotenv";
import express, {Request , Response} from "express";
import * as bodyParse from "body-parser";
import {db} from './db'
import {estudianteRouter} from "./src/Routes/estudianteRouter";
import {profesorRouter} from "./src/Routes/profesoresRouter";
import cors from "cors";
import { error } from "console";
import path from "path";

const app = express();
dotenv.config();

app.use(cors())
app.use(bodyParse.json());
app.use('/estudiantes', estudianteRouter);
app.use('/profesores', profesorRouter);

db.connect((err)=>{
    if(err){
        console.log('Databases Connection Error')
    }else{
        console.log('Databases Connection')
    }
});

app.use((req:Request , res:Response)=>{
    res.status(404).send({ error: "Not Found ", message: "URL not Found"})
});

app.listen(process.env.PORT, ()=>{
    console.log('Node server started running')
    console.log(`Go to http://${process.env.db_HOST}:${process.env.PORT}`)
});
