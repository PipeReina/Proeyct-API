import { Estudiante} from "../Models/estudiantes";
import { db } from "../../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { Request, Response } from 'express';


export const create = (estudiante: Estudiante, callback: Function)=>{
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac, est_e) VALUES ( ?, ?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac],
        (err, result)=>{
            if (err){
                callback(err);
            }
            const insertId=(<OkPacket>result).insertId;
            callback(null,insertId)

        }
    )
}
export const getStudents = (callback: Function) => {
    const queryString = 'SELECT * FROM estudiantes';
  
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      const estudDatos = <Estudiante[]>result;
      callback(null, estudDatos);
    });
  };


  export const update = (cod_e: number, estudiante: Estudiante, callback: Function) => {
    const queryString = `
        UPDATE estudiantes 
        SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ?, est_e = ?
        WHERE cod_e = ?
    `;

    db.query(
        queryString,
        [estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac, estudiante.est_e, cod_e],
        (err, result) => {
            if (err) {
                callback(err);
            }
            const affectedRows = (<OkPacket>result).affectedRows;
            callback(null, affectedRows);
        }
    );
};
export const updateEstado = (cod_e: number, est_e: boolean, callback: Function) => {
    const queryString = `
        UPDATE estudiantes SET est_e = ? WHERE estudiantes.cod_e= ? 
    `;

    db.query(
        queryString,
        [est_e, cod_e],
        (err, result) => {
            if (err) {
                callback(err); // Si hay un error, se llama al callback con el error
            }
            const affectedRows = (<OkPacket>result).affectedRows; // Obtiene el número de filas afectadas por la operación
            callback(null, affectedRows); // Se llama al callback con null como primer argumento (sin error) y el número de filas afectadas como segundo argumento
        }
    );
};