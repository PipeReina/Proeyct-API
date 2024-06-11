"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEstado = exports.update = exports.getProf = exports.create = void 0;
const db_1 = require("../../db");
const create = (profesores, callback) => {
    const queryString = 'INSERT INTO profesores (id_p, profesion,nom_p, dir_p, tel_p, est_p) VALUES ( ?, ?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [profesores.id_p, profesores.profesion, profesores.nom_p, profesores.dir_p, profesores.tel_p], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const getProf = (callback) => {
    const queryString = 'SELECT * FROM profesores';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const estudDatos = result;
        callback(null, estudDatos);
    });
};
exports.getProf = getProf;
const update = (id_p, profesor, callback) => {
    const queryString = `
        UPDATE profesores 
        SET profesion = ?, nom_p = ?, dir_p = ?, tel_p = ?, est_p = ?
        WHERE id_p= ?
    `;
    db_1.db.query(queryString, [profesor.profesion, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.est_p, id_p], (err, result) => {
        if (err) {
            callback(err);
        }
        const numRowAfec = result.affectedRows;
        callback(null, numRowAfec);
    });
};
exports.update = update;
const updateEstado = (id_p, profesor, callback) => {
    const queryString = `
        UPDATE profesores 
        SET profesion = ?, nom_p = ?, dir_p = ?, tel_p = ?, est_p = ?
        WHERE id_p= ?
    `;
    db_1.db.query(queryString, [profesor.profesion, profesor.nom_p, profesor.dir_p, profesor.tel_p, profesor.est_p, id_p], (err, result) => {
        if (err) {
            callback(err);
        }
        const numRowAfec = result.affectedRows;
        callback(null, numRowAfec);
    });
};
exports.updateEstado = updateEstado;
