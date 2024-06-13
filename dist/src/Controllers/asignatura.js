"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAsignaturas = exports.create = void 0;
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
//   export const update = (cod_a: number, asignaturas: Asignatura, callback: Function) => {
//     const queryString = `
//         SET FOREIGN_KEY_CHECKS = 0;
//         UPDATE estudiantes SET nom_a = ?, creditos = ?, tel_e = ?, int_h = ?, grupo = ?, horarios = ? WHERE cod_a = ?;
//         UPDATE inscribe SET nom_a = ?, grupo = ? WHERE cod_e = ?;
//         SET FOREIGN_KEY_CHECKS = 1;
//     `;
//     db.query(
//         queryString,
//         [asignaturas.nom_a, asignaturas.creditos, asignaturas.int_h, asignaturas.grupo, asignaturas.horario,cod_a,asignaturas.nom_a, asignaturas.grupo,cod_a],
//         (err, result) => {
//             if (err) {
//                 callback(err);
//             }
//             const affectedRows = (<OkPacket>result).affectedRows;
//             callback(null, affectedRows);
//         }
//     );
// };
