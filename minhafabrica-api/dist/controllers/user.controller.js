"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select('-password');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuarios', error });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id).select('-password');
        if (!user)
            return res.status(404).json({ message: 'Usuario nao encontrado' });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuario', error });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        if (!user)
            return res.status(404).json({ message: 'Usuario nao encontrado' });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuario', error });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ message: 'Usuario nao encontrado' });
        res.json({ message: 'Usuario deletado com sucesso' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuario', error });
    }
};
exports.deleteUser = deleteUser;
