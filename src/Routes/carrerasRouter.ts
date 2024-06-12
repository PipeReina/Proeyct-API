import express, {Request , Response} from "express";
import * as carreraController from "../Controllers/carrera";
import { carrera} from "../Models/carreras";
import { error } from "console";

const carrerasRouter = express.Router();

carrerasRouter.post('/', async (req: Request, res:Response)=>{
    const newcarrera: carrera = req.body;
    
    console.log(newcarrera);

    eController.create(newcarrera, (err:Error, asigID: number)=>{
        
        if(err){
            return res.status(500).json({'message': err.message});
        }

        res.status(201).json({'asigdId': asigID});
    });

});

carrerasRouter.get('/', (req: Request, res: Response) => {
    carreraController.getcarreras((err: Error, carrera: carrera[]) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json(carrera);
    });
  });

  carrerasRouter.put('/:id_carr', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    const updatedcarrera: carrera = req.body;

    console.log(updatedcarrera);

    carreraController.update(id_carr, updatedcarrera, (err: Error, affectedRows: number) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        if (affectedRows === 0) {
            return res.status(404).json({ 'message': 'carrera no encontrada' });
        }

        res.status(200).json({ 'message': 'carrera actualizada' });
    });
});


// carreraRouter.put('/:cod_e/estado', async (req: Request, res: Response) => {
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

export{carrerasRouter};