import { Estudiante} from "../Models/estudiantes";
import { db } from "../../db";
import { OkPacket, RowDataPacket } from "mysql2";
import { Request, Response } from 'express';


export const create = (estudiante: Estudiante, callback: Function)=>{
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES ( ?, ?, ?, ?, ?)';

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
