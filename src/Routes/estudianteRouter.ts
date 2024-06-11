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

estudianteRouter.get('/', (req: Request, res: Response) => {
    estudianteController.getStudents((err: Error, Estudiante: Estudiante[]) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      res.status(200).json(Estudiante);
    });
  });

  estudianteRouter.put('/:cod_e', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    const updatedEstudiante: Estudiante = req.body;

    console.log(updatedEstudiante);

    estudianteController.update(cod_e, updatedEstudiante, (err: Error, affectedRows: number) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        if (affectedRows === 0) {
            return res.status(404).json({ 'message': 'Estudiante no encontrado' });
        }

        res.status(200).json({ 'message': 'Estudiante actualizado' });
    });
});


estudianteRouter.put('/:cod_e/estado', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e); 
    const { est_e } = req.body; 

    console.log(est_e);

    estudianteController.updateEstado(cod_e, est_e, (err: Error, affectedRows: number) => {
        if (err) { 
            return res.status(500).json({ 'message': err.message });
        }

        if (affectedRows === 0) { 
            return res.status(404).json({ 'message': 'Estudiante no encontrado' });
        }

        res.status(200).json({ 'message': 'Estado del estudiante actualizado' });
    });
});

export{estudianteRouter};