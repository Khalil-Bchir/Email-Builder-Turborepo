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
const org_service_1 = __importDefault(require("./org.service"));
const orgController = {
    createHandler: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            try {
                const org = yield org_service_1.default.create(body);
                return res.code(201).send(org);
            }
            catch (e) {
                console.log(e);
                return res.code(500).send(e);
            }
        });
    },
    getAllHandler: function (_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orgs = yield org_service_1.default.getAll();
                return res.send(orgs);
            }
            catch (e) {
                console.error(e);
                return res.code(500).send(e);
            }
        });
    },
    getByIdHandler: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const organizationId = Number(req.params.organizationId);
            try {
                const org = yield org_service_1.default.getById(organizationId);
                if (!org) {
                    return res.code(404).send({ error: 'Organization not found' });
                }
                return res.send(org);
            }
            catch (e) {
                console.error(e);
                return res.code(500).send(e);
            }
        });
    },
    updateHandler: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const organizationId = Number(req.params.organizationId);
            const data = req.body;
            try {
                const updatedOrg = yield org_service_1.default.update(organizationId, data);
                return res.send(updatedOrg);
            }
            catch (e) {
                console.error(e);
                return res.code(500).send(e);
            }
        });
    },
    deleteHandler: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const organizationId = Number(req.params.organizationId);
            try {
                const deletedOrg = yield org_service_1.default.delete(organizationId);
                if (!deletedOrg) {
                    return res.code(404).send({ error: 'Organization not found' });
                }
                return res.send({ message: `Organization with ID ${organizationId} was deleted successfully` });
            }
            catch (e) {
                console.error(e);
                return res.code(500).send(e);
            }
        });
    },
};
exports.default = orgController;
