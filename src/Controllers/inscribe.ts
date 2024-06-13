import { inscribe} from "../Models/inscribe";
import { db } from "../../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { Request, Response } from 'express';


export const create = (inscribe: inscribe, callback: Function)=>{
    const queryString = 'INSERT INTO inscribe (id_p, nombre_p, cod_a, nombre_a, grupo, cod_e, nombre_e,n1,n2,n3) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?))';

    db.query(
        queryString,
        [inscribe.id_p, inscribe.nombre_p, inscribe.cod_a, inscribe.nombre_a, inscribe.grupo, inscribe.cod_e, inscribe.nombre_e, inscribe.n1, inscribe.n2, inscribe.n3],
        (err, result)=>{
            if (err){
                callback(err);
            }
            const insertId=(<OkPacket>result).insertId;
            callback(null,insertId)

        }
    )
}
export const getinscribe = (callback: Function) => {
    const queryString = 'SELECT * FROM inscribe';
  
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      const asigDatos = <inscribe[]>result;
      callback(null, asigDatos);
    });
  };


  export const update = (id_p: number, inscribe: inscribe, callback: Function) => {
    const queryString = `
        UPDATE inscribes
        SET n1 = ?, n2 = ?, n3 = ?
        WHERE id_p = ? AND cod_a = ? AND cod_e = ? AND grupo = ? AND nom_p = ?;`;

    db.query(
        queryString,
        [inscribe.id_p, inscribe.nombre_p, inscribe.cod_a, inscribe.nombre_a, inscribe.grupo, inscribe.cod_e, inscribe.nombre_e, inscribe.n1, inscribe.n2, inscribe.n3],
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
//         UPDATE inscribes SET est_e = ? WHERE inscribes.cod_e= ? 
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