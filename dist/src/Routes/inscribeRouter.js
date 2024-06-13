"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inscribeRouter = void 0;
const express_1 = __importDefault(require("express"));
const inscribeController = __importStar(require("../Controllers/inscribe"));
const inscribeRouter = express_1.default.Router();
exports.inscribeRouter = inscribeRouter;
inscribeRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newinscribe = req.body;
    console.log(newinscribe);
    inscribeController.create(newinscribe, (err, asigID) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(201).json({ 'asigdId': asigID });
    });
}));
inscribeRouter.get('/', (req, res) => {
    inscribeController.getinscribe((err, inscribe) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(inscribe);
    });
});
inscribeRouter.put('/:id_p', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_p = parseInt(req.params.id_p);
    const updatedinscribe = req.body;
    console.log(updatedinscribe);
    inscribeController.update(id_p, updatedinscribe, (err, affectedRows) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ 'message': 'inscribe no encontrada' });
        }
        res.status(200).json({ 'message': 'inscribe actualizada' });
    });
}));
/////////////////////////////////////////////////////////// Consulta asignaturas por profesor y viceversa a través de API
inscribeRouter.get('/profesores', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cod_a = parseInt(req.query.cod_a); // Accede al parámetro cod_a desde req.query
    console.log(cod_a);
    inscribeController.getProfeAsig(cod_a, (err, inscribe) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(inscribe);
    });
}));
inscribeRouter.get('/asignatura', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_p = parseInt(req.query.id_p); // Accede al parámetro cod_a desde req.query
    console.log(id_p);
    inscribeController.getAsigProfe(id_p, (err, inscribe) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(inscribe);
    });
}));
//////////////////////////////////////////////////////////////////Lista de estudiantes por asignatura y grupo con sus notas a través de API
inscribeRouter.get('/estudiantes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cod_a = parseInt(req.query.cod_a);
    const grupo = parseInt(req.query.grupo);
    console.log(cod_a);
    console.log(grupo);
    inscribeController.getEstAsigGRu(cod_a, grupo, (err, inscribe) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(inscribe);
    });
}));
//////////////////////////////////////////////////////////////////Lista de estudiantes por asignatura y grupo con sus notas a través de API
inscribeRouter.get('/asignatura-est', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cod_e = parseInt(req.query.cod_e);
    console.log(cod_e);
    inscribeController.getAsigEst(cod_e, (err, inscribe) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(inscribe);
    });
}));
