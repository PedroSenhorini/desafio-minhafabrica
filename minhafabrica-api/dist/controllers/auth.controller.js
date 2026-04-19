"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'Email ja cadastrado' });
        const user = await User_1.default.create({ name, email, password, role });
        console.log('Usuario criado:', user);
        res.status(201).json({
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token: generateToken(user._id.toString(), user.role),
        });
    }
    catch (error) {
        console.error('ERRO REGISTER:', error);
        res.status(500).json({ message: 'Erro ao registrar usuario', error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(401).json({ message: 'Credenciais invalidas' });
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(401).json({ message: 'Credenciais invalidas' });
        res.json({
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token: generateToken(user._id.toString(), user.role),
        });
    }
    catch (error) {
        console.error('ERRO LOGIN:', error);
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
};
exports.login = login;
