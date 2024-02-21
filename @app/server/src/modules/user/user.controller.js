"use strict";
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
const user_service_1 = __importDefault(require("./user.service"));
const user_schema_1 = require("./user.schema");
const userController = {
    registerHandler: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const user = yield user_service_1.default.create(body);
                return res.code(201).send(user);
            }
            catch (e) {
                console.log(e);
                return res.code(500).send(e);
            }
        });
    },
    getAllHandler: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_service_1.default.getAll();
                return res.send(users);
            }
            catch (e) {
                console.error(e);
                return res.code(500).send(e);
            }
        });
    },
    getByIdHandler: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Id = Number(req.params.id);
                const user = yield user_service_1.default.getById(Id);
                if (!user) {
                    return res.code(404).send({ error: "User not found" });
                }
                return res.send(user);
            }
            catch (e) {
                console.error(e);
                return res.code(500).send(e);
            }
        });
    },
    updateHandler: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Id = Number(req.params.id);
                const userData = req.body;
                const updatedUser = yield user_service_1.default.update(Id, userData);
                return res.send(user_schema_1.updatedUserResponseSchema.parse(updatedUser));
            }
            catch (e) {
                console.error(e);
                return res.code(500).send(e);
            }
        });
    },
    deleteHandler: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Id = Number(req.params.id);
                const resultMessage = yield user_service_1.default.delete(Id);
                return res.send({ message: resultMessage });
            }
            catch (e) {
                console.error(e);
                return res.code(500).send(e);
            }
        });
    },
};
exports.default = userController;
