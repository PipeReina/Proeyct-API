"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getinscribe = exports.create = void 0;
const db_1 = require("../../db");
const create = (inscribe, callback) => {
    const queryString = 'INSERT INTO inscribe (id_p, nombre_p, cod_a, nombre_a, grupo, cod_e, nombre_e,n1,n2,n3) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?))';
    db_1.db.query(queryString, [inscribe.id_p, inscribe.nombre_p, inscribe.cod_a, inscribe.nombre_a, inscribe.grupo, inscribe.cod_e, inscribe.nombre_e, inscribe.n1, inscribe.n2, inscribe.n3], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const getinscribe = (callback) => {
    const queryString = 'SELECT * FROM inscribe';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const asigDatos = result;
        callback(null, asigDatos);
    });
};
exports.getinscribe = getinscribe;
const update = (id_p, inscribe, callback) => {
    const queryString = `
        UPDATE inscribes
        SET n1 = ?, n2 = ?, n3 = ?
        WHERE id_p = ? AND cod_a = ? AND cod_e = ? AND grupo = ? AND nom_p = ?;`;
    db_1.db.query(queryString, [inscribe.id_p, inscribe.nombre_p, inscribe.cod_a, inscribe.nombre_a, inscribe.grupo, inscribe.cod_e, inscribe.nombre_e, inscribe.n1, inscribe.n2, inscribe.n3], (err, result) => {
        if (err) {
            callback(err);
        }
        const affectedRows = result.affectedRows;
        callback(null, affectedRows);
    });
};
exports.update = update;
// export const updateEstado = (cod_e: number, est_e: boolean, callback: Function) => {
//     const queryString = `
//         UPDATE inscribes SET est_e = ? WHERE inscribes.cod_e= ? 
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
