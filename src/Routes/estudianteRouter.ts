import express, {Request , Response} from "express";
import * as estudianteController from "../Controllers/estudiante";
import { Estudiante} from "../Models/estudiantes";
import { error } from "console";

const estudianteRouter = express.Router();

estudianteRouter.post('/', async (req: Request, res:Response)=>{
    const newEstudiante: Estudiante = req.body;
    
    console.log(newEstudiante);

    estudianteController.create(newEstudiante, (err:Error, estudID: number)=>{
        
        if(err){
            return res.status(500).json({'message': err.message});
        }

        res.status(201).json({'estudId': estudID});
    });

});


export{estudianteRouter};