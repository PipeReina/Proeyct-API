import express, {Request , Response} from "express";
import * as imparteController from "../Controllers/imparte";
import { imparte} from "../Models/imparte";
import { error } from "console";

const imparteRouter = express.Router();

imparteRouter.post('/', async (req: Request, res:Response)=>{
    const newimparte: imparte = req.body;
    
    console.log(newimparte);

    eController.create(newimparte, (err:Error, asigID: number)=>{
        
        if(err){
            return res.status(500).json({'message': err.message});
        }

        res.status(201).json({'asigdId': asigID});
    });

});

imparteRouter.get('/', (req: Request, res: Response) => {
    imparteController.getimparte((err: Error, imparte: imparte[]) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json(imparte);
    });
  });

  imparteRouter.put('/:id_carr', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    const updatedimparte: imparte = req.body;

    console.log(updatedimparte);

    imparteController.update(id_p, updatedimparte, (err: Error, affectedRows: number) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        if (affectedRows === 0) {
            return res.status(404).json({ 'message': 'imparte no encontrada' });
        }

        res.status(200).json({ 'message': 'imparte actualizada' });
    });
});


// imparteRouter.put('/:cod_e/estado', async (req: Request, res: Response) => {
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

export{imparteRouter};