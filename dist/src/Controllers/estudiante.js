"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEstado = exports.update = exports.getStudents = exports.create = void 0;
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
const update = (cod_e, estudiante, callback) => {
    const queryString = `
        UPDATE estudiantes 
        SET nom_e = ?, dir_e = ?, tel_e = ?, fech_nac = ?, est_e = ?
        WHERE cod_e = ?
    `;
    db_1.db.query(queryString, [estudiante.nom_e, estudiante.dir_e, estudiante.tel_e, estudiante.fech_nac, estudiante.est_e, cod_e], (err, result) => {
        if (err) {
            callback(err);
        }
        const affectedRows = result.affectedRows;
        callback(null, affectedRows);
    });
};
exports.update = update;
const updateEstado = (cod_e, est_e, callback) => {
    const queryString = `
        UPDATE estudiantes SET est_e = ? WHERE estudiantes.cod_e= ? 
    `;
    db_1.db.query(queryString, [est_e, cod_e], (err, result) => {
        if (err) {
            callback(err); // Si hay un error, se llama al callback con el error
        }
        const affectedRows = result.affectedRows; // Obtiene el número de filas afectadas por la operación
        callback(null, affectedRows); // Se llama al callback con null como primer argumento (sin error) y el número de filas afectadas como segundo argumento
    });
};
exports.updateEstado = updateEstado;
