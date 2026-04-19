"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getProducts = async (req, res) => {
    try {
        const products = await Product_1.default.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos', error });
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product)
            return res.status(404).json({ message: 'Produto nao encontrado' });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produto', error });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const product = await Product_1.default.create(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao criar produto', error });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product)
            return res.status(404).json({ message: 'Produto nao encontrado' });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findByIdAndDelete(req.params.id);
        if (!product)
            return res.status(404).json({ message: 'Produto nao encontrado' });
        res.json({ message: 'Produto deletado com sucesso' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao deletar produto', error });
    }
};
exports.deleteProduct = deleteProduct;
