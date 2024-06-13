import { inscribe} from "../Models/inscribe";
import { db } from "../../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { Request, Response } from 'express';


export const create = (inscribe: inscribe, callback: Function)=>{
    const queryString = 'INSERT INTO inscribe (id_p, nom_p, cod_a, nom_a, grupo, cod_e, nomb_e, n1, n2, n3) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [inscribe.id_p, inscribe.nom_p, inscribe.cod_a, inscribe.nom_a, inscribe.grupo, inscribe.cod_e, inscribe.nom_e, inscribe.n1, inscribe.n2, inscribe.n3],
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
        [inscribe.id_p, inscribe.nom_p, inscribe.cod_a, inscribe.nom_a, inscribe.grupo, inscribe.cod_e, inscribe.nom_e, inscribe.n1, inscribe.n2, inscribe.n3],
        (err, result) => {
            if (err) {
                callback(err);
            }
            const affectedRows = (<OkPacket>result).affectedRows;
            callback(null, affectedRows);
        }
    );
};

///////////////////////////////////////////////////////////  Consulta asignaturas por profesor y viceversa a través de API

export const getProfeAsig = (cod_a: number, callback: Function) => {
    const queryString = `
        SELECT id_p, nom_p, cod_a, nom_a FROM inscribe WHERE cod_a = ?;
    `;

    db.query(queryString, 
        [cod_a],
        (err, result) => {
        if (err) {
          callback(err);
          return;
        }
        const asigDatos = <inscribe[]>result;
        callback(null, asigDatos);
      });
    };

    export const getAsigProfe = (id_p: number, callback: Function) => {
        const queryString = `
            SELECT  cod_a, nom_a, id_p, nom_p FROM inscribe WHERE id_p = ? ;
        `;
    
        db.query(queryString, 
            [id_p],
            (err, result) => {
            if (err) {
              callback(err);
              return;
            }
            const asigDatos = <inscribe[]>result;
            callback(null, asigDatos);
          });
        };


//////////////////////////////////////////////////////////////////Lista de estudiantes por asignatura y grupo con sus notas a través de API

export const getEstAsigGRu= (cod_a: number,grupo: number, callback: Function) => {
    const queryString = `
        SELECT cod_e, nom_e, n1, n2, n3 FROM inscribe WHERE cod_a= ? and grupo= ?;
    `;

    db.query(queryString, 
        [cod_a,grupo],
        (err, result) => {
        if (err) {
          callback(err);
          return;
        }
        const asigDatos = <inscribe[]>result;
        callback(null, asigDatos);
      });
    };
//////////////////////////////////////////////////////////////////Lista de estudiantes por asignatura y grupo con sus notas a través de API

export const getAsigEst= (cod_e: number, callback: Function) => {
    const queryString = `
        SELECT cod_a, nom_a, n1, n2, n3 FROM inscribe WHERE cod_e= ? 
    `;

    db.query(queryString, 
        [cod_e],
        (err, result) => {
        if (err) {
          callback(err);
          return;
        }
        const asigDatos = <inscribe[]>result;
        callback(null, asigDatos);
      });
    };




