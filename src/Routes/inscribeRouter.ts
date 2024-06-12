import express, {Request , Response} from "express";
import * as inscribeController from "../Controllers/inscribe";
import { inscribe} from "../Models/inscribe";
import { error } from "console";

const inscribeRouter = express.Router();

inscribeRouter.post('/', async (req: Request, res:Response)=>{
    const newinscribe: inscribe = req.body;
    
    console.log(newinscribe);

    eController.create(newinscribe, (err:Error, asigID: number)=>{
        
        if(err){
            return res.status(500).json({'message': err.message});
        }

        res.status(201).json({'asigdId': asigID});
    });

});

inscribeRouter.get('/', (req: Request, res: Response) => {
    inscribeController.getinscribe((err: Error, inscribe: inscribe[]) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json(inscribe);
    });
  });

  inscribeRouter.put('/:id_p', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.params.cod_e);
    const updatedinscribe: inscribe = req.body;

    console.log(updatedinscribe);

    inscribeController.update(id_p, updatedinscribe, (err: Error, affectedRows: number) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }

        if (affectedRows === 0) {
            return res.status(404).json({ 'message': 'inscribe no encontrada' });
        }

        res.status(200).json({ 'message': 'inscribe actualizada' });
    });
});


// inscribeRouter.put('/:cod_e/estado', async (req: Request, res: Response) => {
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

export{inscribeRouter};