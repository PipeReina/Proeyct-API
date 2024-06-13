import { Estudiante} from "../Models/estudiantes";
import { db } from "../../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { Request, Response } from 'express';


export const create = (estudiante: Estudiante, callback: Function)=>{
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac, carrera, tipo_u, est_e) VALUES ( ?, ?, ?, ?, ?, ?, ?,?)';

    db.query(
        queryString,
        [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac,estudiante.carrera, estudiante.tipo_u, estudiante.est_e],
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
        SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ?, carrera = ?, tipo_u = ?, est_e = ?
        WHERE cod_e = ?
    `;

    db.query(
        queryString,
        [estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac, estudiante.carrera, estudiante.tipo_u, estudiante.est_e, cod_e],
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
                callback(err); 
            }
            const affectedRows = (<OkPacket>result).affectedRows; 
            callback(null, affectedRows); 
        }
    );
};

export const getUsuarios = (callback: Function) => {
    const queryString = 'SELECT cod_e AS id, nom_e AS nombre, tipo_u AS Usuario FROM estudiantes UNION SELECT id_p AS id, nom_p AS nombre, tipo_u AS Usuario FROM profesores;';
  
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err, null); // Aquí se envía el error y null como segundo argumento
        return;
      }
      const usuarios = <Estudiante[]>result;
      callback(null, usuarios); // Aquí se envían los usuarios como segundo argumento
    });
};
