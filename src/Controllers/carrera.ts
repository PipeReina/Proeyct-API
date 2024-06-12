import { carreras} from "../Models/carreras";
import { db } from "../../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { Request, Response } from 'express';


export const create = (carreras: carreras, callback: Function)=>{
    const queryString = 'INSERT INTO carreras (id_carr, nom_carr, reg_calif) VALUES ( ?, ?, ?)';

    db.query(
        queryString,
        [carreras.cod_a, carreras.id_carr, carreras.nom_carr, carreras.reg_calif],
        (err, result)=>{
            if (err){
                callback(err);
            }
            const insertId=(<OkPacket>result).insertId;
            callback(null,insertId)

        }
    )
}
export const getcarreras = (callback: Function) => {
    const queryString = 'SELECT * FROM carreras';
  
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      const asigDatos = <carreras[]>result;
      callback(null, asigDatos);
    });
  };


  export const update = (id_carr: number, carreras: carreras, callback: Function) => {
    const queryString = `
        UPDATE carrerass 
        SET id_carr = ?, nom_carr = ?, reg_calif = ? 
        WHERE id_carr = ?
    `;

    db.query(
        queryString,
        [carreras.id_carr, carreras.nom_carr, carreras.reg_calif],
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
//         UPDATE carrerass SET est_e = ? WHERE carrerass.cod_e= ? 
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