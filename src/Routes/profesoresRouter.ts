import express, {Request , Response} from "express";
import * as profesorController from "../Controllers/profesor";
import { Profesor} from "../Models/profesores";

const profesorRouter = express.Router();

profesorRouter.post('/', async (req: Request, res:Response)=>{
    const newProfesor: Profesor = req.body;
    
    console.log(newProfesor);

    profesorController.create(newProfesor, (err:Error, profID: number)=>{
        
        if(err){
            return res.status(500).json({'message': err.message});
        }

        res.status(201).json({'profId': profID});
    });

});

export{profesorRouter};