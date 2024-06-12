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

profesorRouter.get('/', (req: Request, res: Response) => {
    profesorController.getProf((err: Error, Profesor: Profesor[]) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      res.status(200).json(Profesor);
    });
  });


  profesorRouter.put('/:id_p', async (req: Request, res: Response) => {
    const id_p = parseInt(req.params.id_p);
    const updatedProfesor: Profesor = req.body;

    console.log(updatedProfesor);

    profesorController.update(id_p, updatedProfesor, (err: Error, affectedRows: number) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        if (affectedRows === 0) {
            return res.status(404).json({ 'message': 'Profesor no encontrado' });
        }

        res.status(200).json({ 'message': 'Profesor actualizado' });
    });
});

profesorRouter.get('/users', (req: Request, res: Response) => {
    profesorController.getUsuarios((err: Error, Profesor: Profesor[]) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      res.status(200).json(Profesor);
    });
  });

export{profesorRouter};