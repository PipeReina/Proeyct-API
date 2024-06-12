import { imparte} from "../Models/imparte";
import { db } from "../../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { Request, Response } from 'express';


export const create = (imparte: imparte, callback: Function)=>{
    const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES ( ?, ?, ?,))';

    db.query(
        queryString,
        [imparte.cod_a, imparte.id_carr, imparte.nom_carr, imparte.reg_calif],
        (err, result)=>{
            if (err){
                callback(err);
            }
            const insertId=(<OkPacket>result).insertId;
            callback(null,insertId)

        }
    )
}
export const getimparte = (callback: Function) => {
    const queryString = 'SELECT * FROM imparte';
  
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      const asigDatos = <imparte[]>result;
      callback(null, asigDatos);
    });
  };


  export const update = (id_p: number, imparte: imparte, callback: Function) => {
    const queryString = `
        UPDATE impartes
        SET id_p = ?, cod_a = ?, grupo = ?, horario = ? 
        WHERE id_carr = ?
    `;

    db.query(
        queryString,
        [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario],
        (err, result) => {
            if (err) {
                callback(err);
            }
            const affectedRows = (<OkPacket>result).affectedRows;
            callback(null, affectedRows);
        }
    );
};
// export const updateEstado = (cod_e: number, est_e: boolean, callback: Function) => {
//     const queryString = `
//         UPDATE impartes SET est_e = ? WHERE impartes.cod_e= ? 
//     `;

//     db.query(
//         queryString,
//         [est_e, cod_e],
//         (err, result) => {
//             if (err) {
//                 callback(err); // Si hay un error, se llama al callback con el error
//             }
//             const affectedRows = (<OkPacket>result).affectedRows; // Obtiene el número de filas afectadas por la operación
//             callback(null, affectedRows); // Se llama al callback con null como primer argumento (sin error) y el número de filas afectadas como segundo argumento
//         }
//     );
// };