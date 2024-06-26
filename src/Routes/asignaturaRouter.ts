import express, {Request , Response} from "express";
import * as asignaturaController from "../Controllers/asignatura";
import { Asignatura } from "../Models/asignaturas";
import { error } from "console";

const asignaturaRouter = express.Router();

asignaturaRouter.post('/', async (req: Request, res:Response)=>{
    const newAsignatura: Asignatura = req.body;
    
    console.log(newAsignatura);

    asignaturaController.create(newAsignatura, (err:Error, asigID: number)=>{
        
        if(err){
            return res.status(500).json({'message': err.message});
        }

        res.status(201).json({'asigdId': asigID});
    });

});

asignaturaRouter.get('/', (req: Request, res: Response) => {
    asignaturaController.getAsignaturas((err: Error, Asignatura: Asignatura[]) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      res.status(200).json(Asignatura);
    });
  });

//   asignaturaRouter.put('/:cod_a', async (req: Request, res: Response) => {
//     const cod_a = parseInt(req.params.cod_a);
//     const updatedAsignatura: Asignatura = req.body;

//     console.log(updatedAsignatura);

//     asignaturaController.update(cod_a, updatedAsignatura, (err: Error, affectedRows: number) => {
//         if (err) {
//             return res.status(500).json({ 'message': err.message });
//         }

//         if (affectedRows === 0) {
//             return res.status(404).json({ 'message': 'Asignatura no encontrada' });
//         }

//         res.status(200).json({ 'message': 'Asignatura actualizada' });
//     });
// });




export default asignaturaRouter;


// asignaturaRouter.put('/:cod_e/estado', async (req: Request, res: Response) => {
//     const cod_e = parseInt(req.params.cod_e); 
//     const { est_e } = req.body; 

//     console.log(est_e);

//     estudianteController.updateEstado(cod_e, est_e, (err: Error, affectedRows: number) => {
//         if (err) { 
//             return res.status(500).json({ 'message': err.message });
//         }

//         if (affectedRows === 0) { 
//             return res.status(404).json({ 'message': 'Estudiante no encontrado' });
//         }

//         res.status(200).json({ 'message': 'Estado del estudiante actualizado' });
//     });
// });

export{asignaturaRouter};