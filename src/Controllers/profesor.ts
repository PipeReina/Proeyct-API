import { Profesor } from "../Models/profesores";
import { db } from "../../db";
import { OkPacket, RowDataPacket } from "mysql2";


export const create = (profesores: Profesor, callback: Function)=>{
    const queryString = 'INSERT INTO profesores (id_p, profesion,nom_p, dir_p, tel_p, tipo_u, est_p) VALUES ( ?, ?, ?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [profesores.id_p, profesores.profesion, profesores.nom_p, profesores.dir_p, profesores.tel_p, profesores.tipo_u, profesores.est_p],
        (err, result)=>{
            if (err){
                callback(err);
            }
            const insertId=(<OkPacket>result).insertId;
            callback(null,insertId)

        }
    )
};

export const getProf = (callback: Function) => {
    const queryString = 'SELECT * FROM profesores';
  
    db.query(queryString, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      const estudDatos = <Profesor[]>result;
      callback(null, estudDatos);
    });
  };

  export const update = (id_p: number, profesor: Profesor, callback: Function) => {
    const queryString = `
        UPDATE profesores 
        SET profesion = ?, nom_p = ?, dir_p = ?, tel_p = ?, tipo_u = ?, est_p = ?
        WHERE id_p= ?
    `;

    db.query(
        queryString,
        [profesor.profesion, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.tipo_u, profesor.est_p, id_p],
        (err, result) => {
            if (err) {
                callback(err);
            }
            const numRowAfec = (<OkPacket>result).affectedRows;
            callback(null, numRowAfec);
        }
    );
};

export const updateEstado = (id_p: number, est_p: boolean, callback: Function) => {
    const queryString = `
        UPDATE profesores SET est_p = ? WHERE profesores.id_p= ? 
    `;

    db.query(
        queryString,
        [est_p, id_p],
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
        callback(err);
        return;
      }
      const estudDatos = <Profesor[]>result;
      callback(null, estudDatos);
    });
  };