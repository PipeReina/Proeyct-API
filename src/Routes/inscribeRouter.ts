import express, {Request , Response} from "express";
import * as inscribeController from "../Controllers/inscribe";
import { inscribe} from "../Models/inscribe";
import { error } from "console";

const inscribeRouter = express.Router();

inscribeRouter.post('/', async (req: Request, res:Response)=>{
    const newinscribe: inscribe = req.body;
    
    console.log(newinscribe);

    inscribeController.create(newinscribe, (err:Error, asigID: number)=>{
        
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
    const id_p = parseInt(req.params.id_p);
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
/////////////////////////////////////////////////////////// Consulta asignaturas por profesor y viceversa a través de API

inscribeRouter.get('/profesores', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.query.cod_a as string); // Accede al parámetro cod_a desde req.query
    console.log(cod_a);
    inscribeController.getProfeAsig(cod_a, (err: Error, inscribe: inscribe[]) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      res.status(200).json(inscribe);
    });
  });
  
  

inscribeRouter.get('/asignatura', async (req: Request, res: Response) => {
    const id_p = parseInt(req.query.id_p as string); // Accede al parámetro cod_a desde req.query
    console.log(id_p);
    inscribeController.getAsigProfe(id_p, (err: Error, inscribe: inscribe[]) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
  
      res.status(200).json(inscribe);
    });
  });
  

//////////////////////////////////////////////////////////////////Lista de estudiantes por asignatura y grupo con sus notas a través de API


inscribeRouter.get('/estudiantes', async (req: Request, res: Response) => {
    const cod_a = parseInt(req.query.cod_a as string); 
    const grupo = parseInt(req.query.grupo as string); 
    

     console.log(cod_a);
     console.log(grupo);

     inscribeController.getEstAsigGRu(cod_a, grupo,(err: Error, inscribe: inscribe[]) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
    
        res.status(200).json(inscribe);
      });
    });

    
//////////////////////////////////////////////////////////////////Lista de estudiantes por asignatura y grupo con sus notas a través de API

inscribeRouter.get('/asignatura-est', async (req: Request, res: Response) => {
    const cod_e = parseInt(req.query.cod_e as string); 
    

     console.log(cod_e);

     inscribeController.getAsigEst(cod_e,(err: Error, inscribe: inscribe[]) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
    
        res.status(200).json(inscribe);
      });
    });



// inscribeRouter.put('/:cod_a/estado', async (req: Request, res: Response) => {
//     const cod_a = parseInt(req.params.cod_e); 
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