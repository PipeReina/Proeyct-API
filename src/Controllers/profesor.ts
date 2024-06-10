import { Profesor } from "../Models/profesores";
import { db } from "../../db";
import { OkPacket, RowDataPacket } from "mysql2";


export const create = (profesores: Profesor, callback: Function)=>{
    const queryString = 'INSERT INTO profesores (id_p, profesion,nom_p, dir_p, tel_p) VALUES ( ?, ?, ?, ?, ?)';

    db.query(
        queryString,
        [profesores.id_p, profesores.profesion, profesores.nom_p, profesores.dir_p, profesores.tel_p],
        (err, result)=>{
            if (err){
                callback(err);
            }
            const insertId=(<OkPacket>result).insertId;
            callback(null,insertId)

        }
    )
}
