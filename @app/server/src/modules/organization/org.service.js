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
const prisma_1 = __importDefault(require("../../utils/prisma"));
const orgService = {
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma_1.default.organization.create({
                    data: {
                        name: input.name,
                    },
                });
            }
            catch (error) {
                console.error('Error creating organization:', error);
                throw error;
            }
        });
    },
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma_1.default.organization.findMany({
                    select: {
                        name: true,
                        organizationId: true,
                    },
                });
            }
            catch (error) {
                console.error('Error retrieving organizations:', error);
                throw error;
            }
        });
    },
    getById(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma_1.default.organization.findUnique({
                    where: {
                        organizationId,
                    },
                    select: {
                        name: true,
                        organizationId: true,
                    },
                });
            }
            catch (error) {
                console.error(`Error retrieving organization with ID ${organizationId}:`, error);
                throw error;
            }
        });
    },
    update(organizationId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma_1.default.organization.update({
                    where: { organizationId },
                    data: {
                        name: data.name,
                    },
                });
            }
            catch (error) {
                console.error(`Error updating organization with ID ${organizationId}:`, error);
                throw error;
            }
        });
    },
    delete(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma_1.default.organization.delete({
                    where: {
                        organizationId,
                    },
                });
            }
            catch (error) {
                console.error(`Error deleting organization with ID ${organizationId}:`, error);
                throw error;
            }
        });
    },
};
exports.default = orgService;
