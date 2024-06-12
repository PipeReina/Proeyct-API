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
exports.estudianteRouter = void 0;
const express_1 = __importDefault(require("express"));
const estudianteController = __importStar(require("../Controllers/estudiante"));
const estudianteRouter = express_1.default.Router();
exports.estudianteRouter = estudianteRouter;
estudianteRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newEstudiante = req.body;
    console.log(newEstudiante);
    estudianteController.create(newEstudiante, (err, estudID) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(201).json({ 'estudId': estudID });
    });
}));
estudianteRouter.get('/', (req, res) => {
    estudianteController.getStudents((err, Estudiante) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(Estudiante);
    });
});
estudianteRouter.put('/:cod_e', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cod_e = parseInt(req.params.cod_e);
    const updatedEstudiante = req.body;
    console.log(updatedEstudiante);
    estudianteController.update(cod_e, updatedEstudiante, (err, affectedRows) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ 'message': 'Estudiante no encontrado' });
        }
        res.status(200).json({ 'message': 'Estudiante actualizado' });
    });
}));
estudianteRouter.put('/:cod_e/estado', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cod_e = parseInt(req.params.cod_e);
    const { est_e } = req.body;
    console.log(est_e);
    estudianteController.updateEstado(cod_e, est_e, (err, affectedRows) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ 'message': 'Estudiante no encontrado' });
        }
        res.status(200).json({ 'message': 'Estado del estudiante actualizado' });
    });
}));
estudianteRouter.get('/users', (req, res) => {
    estudianteController.getUsuarios((err, usuarios) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(usuarios);
    });
});
