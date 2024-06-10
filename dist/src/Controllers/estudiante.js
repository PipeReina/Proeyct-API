"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudents = exports.create = void 0;
const db_1 = require("../../db");
const create = (estudiante, callback) => {
    const queryString = 'INSERT INTO estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac, est_e) VALUES ( ?, ?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [estudiante.cod_e, estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const getStudents = (callback) => {
    const queryString = 'SELECT * FROM estudiantes';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const estudDatos = result;
        callback(null, estudDatos);
    });
};
exports.getStudents = getStudents;
