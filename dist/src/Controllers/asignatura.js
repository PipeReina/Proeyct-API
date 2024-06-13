"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAsignatura = exports.update = exports.getAsignaturas = exports.create = void 0;
const db_1 = require("../../db");
const create = (asignaturas, callback) => {
    const queryString = 'INSERT INTO asignaturas (cod_a, nom_a, creditos, int_h, grupos, horario) VALUES ( ?, ?, ?, ?, ?, ?)';
    db_1.db.query(queryString, [asignaturas.cod_a, asignaturas.nom_a, asignaturas.creditos, asignaturas.int_h, asignaturas.grupo, asignaturas.horario], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const getAsignaturas = (callback) => {
    const queryString = 'SELECT * FROM asignaturas';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const asigDatos = result;
        callback(null, asigDatos);
    });
};
exports.getAsignaturas = getAsignaturas;
const update = (cod_a, asignaturas, callback) => {
    const queryString = `
        UPDATE asignaturas 
        SET cod_a = ?, nom_a = ?, creditos = ?, int_h = ?, grupo=?, horario=? 
        WHERE cod_a = ?
    `;
    db_1.db.query(queryString, [asignaturas.nom_a, asignaturas.creditos, asignaturas.int_h], (err, result) => {
        if (err) {
            callback(err);
        }
        const affectedRows = result.affectedRows;
        callback(null, affectedRows);
    });
};
exports.update = update;
///////////////////////////////////////////////////////////Update asignaturas impartidas (grupo, horario) a traves de API
const updateAsignatura = (grupo, horario, asignatura, callback) => {
    const queryString = `
        UPDATE asignaturas
        SET nom_a = ?
        WHERE grupo = ? AND horario = ?;
    `;
    db_1.db.query(queryString, [asignatura.nom_a, grupo, horario], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const affectedRows = result.affectedRows;
        callback(null, affectedRows);
    });
};
exports.updateAsignatura = updateAsignatura;
// export const updateEstado = (cod_e: number, est_e: boolean, callback: Function) => {
//     const queryString = `
//         UPDATE asignaturass SET est_e = ? WHERE asignaturass.cod_e= ? 
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
