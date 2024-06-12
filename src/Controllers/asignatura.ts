import { Asignatura } from "../Models/asignaturas";
import { db } from "../../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { Request, Response } from 'express';


export const create = (asignaturas: Asignatura, callback: Function)=>{
    const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, creditos, int_h) VALUES ( ?, ?, ?, ?)';

    db.query(
        queryString,
        [asignaturas.cod_a, asignaturas.nom_a, asignaturas.creditos, asignaturas.int_h],
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


  export const update = (cod_a: number, asignaturas: Asignatura, callback: Function) => {
    const queryString = `
        UPDATE asignaturass 
        SET cod_a = ?, nom_a = ?, creditos = ?, int_h = ? 
        WHERE cod_a = ?
    `;

    db.query(
        queryString,
        [asignaturas.nom_a, asignaturas.creditos, asignaturas.int_h],
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
//         UPDATE asignaturass SET est_e = ? WHERE asignaturass.cod_e= ? 
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