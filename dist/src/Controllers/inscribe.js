"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAsigEst = exports.getEstAsigGRu = exports.getAsigProfe = exports.getProfeAsig = exports.update = exports.getinscribe = exports.create = void 0;
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
///////////////////////////////////////////////////////////  Consulta asignaturas por profesor y viceversa a través de API
const getProfeAsig = (cod_a, callback) => {
    const queryString = `
        SELECT id_p, nom_p, cod_a, nom_a FROM inscribe WHERE cod_a = ?;
    `;
    db_1.db.query(queryString, [cod_a], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const asigDatos = result;
        callback(null, asigDatos);
    });
};
exports.getProfeAsig = getProfeAsig;
const getAsigProfe = (id_p, callback) => {
    const queryString = `
            SELECT  cod_a, nom_a, id_p, nom_p FROM inscribe WHERE id_p = ? ;
        `;
    db_1.db.query(queryString, [id_p], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const asigDatos = result;
        callback(null, asigDatos);
    });
};
exports.getAsigProfe = getAsigProfe;
//////////////////////////////////////////////////////////////////Lista de estudiantes por asignatura y grupo con sus notas a través de API
const getEstAsigGRu = (cod_a, grupo, callback) => {
    const queryString = `
        SELECT cod_e, nom_e, n1, n2, n3 FROM inscribe WHERE cod_a= ? and grupo= ?;
    `;
    db_1.db.query(queryString, [cod_a, grupo], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const asigDatos = result;
        callback(null, asigDatos);
    });
};
exports.getEstAsigGRu = getEstAsigGRu;
//////////////////////////////////////////////////////////////////Lista de estudiantes por asignatura y grupo con sus notas a través de API
const getAsigEst = (cod_e, callback) => {
    const queryString = `
        SELECT cod_a, nom_a, n1, n2, n3 FROM inscribe WHERE cod_e= ? 
    `;
    db_1.db.query(queryString, [cod_e], (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        const asigDatos = result;
        callback(null, asigDatos);
    });
};
exports.getAsigEst = getAsigEst;
