import { Asignatura } from "../Models/asignaturas";
import { db } from "../../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { Request, Response } from 'express';


export const create = (asignaturas: Asignatura, callback: Function)=>{
    const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, creditos, int_h, grupos, horario) VALUES ( ?, ?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [asignaturas.cod_a, asignaturas.nom_a, asignaturas.creditos, asignaturas.int_h, asignaturas.grupo, asignaturas.horario],
        (err, result)=>{
            if (err){
                callback(err);
            }
            const insertId=(<OkPacket>result).insertId;
            callback(null,insertId)

        }
    )
}
export const getAsignaturas = (callback: Function) => {
    const queryString = 'SELECT * FROM asignaturas';
  
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      const asigDatos = <Asignatura[]>result;
      callback(null, asigDatos);
    });
  };


//   export const update = (cod_a: number, asignaturas: Asignatura, callback: Function) => {
//     const queryString = `
//         SET FOREIGN_KEY_CHECKS = 0;
        
//         UPDATE estudiantes SET nom_a = ?, creditos = ?, tel_e = ?, int_h = ?, grupo = ?, horarios = ? WHERE cod_a = ?;
//         UPDATE inscribe SET nom_a = ?, grupo = ? WHERE cod_e = ?;
        
//         SET FOREIGN_KEY_CHECKS = 1;

//     `;

//     db.query(
//         queryString,
//         [asignaturas.nom_a, asignaturas.creditos, asignaturas.int_h, asignaturas.grupo, asignaturas.horario,cod_a,asignaturas.nom_a, asignaturas.grupo,cod_a],
//         (err, result) => {
//             if (err) {
//                 callback(err);
//             }
//             const affectedRows = (<OkPacket>result).affectedRows;
//             callback(null, affectedRows);
//         }
//     );
// };

