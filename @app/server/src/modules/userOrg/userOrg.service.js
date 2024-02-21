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
const database_1 = require("@demo/database");
const userOrgService = {
    sendInvitation(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma_1.default.userOrganization.create({
                    data: Object.assign(Object.assign({}, input), { invitationStatus: database_1.InvitationStatus.PENDING }),
                });
            }
            catch (error) {
                console.error("Error sending invitation:", error);
                throw new Error("Failed to send invitation");
            }
        });
    },
    acceptInvitation(userId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUserOrg = yield prisma_1.default.userOrganization.findUnique({
                    where: {
                        userId_organizationId: {
                            userId,
                            organizationId,
                        },
                        invitationStatus: 'PENDING',
                    },
                });
                if (!existingUserOrg) {
                    throw new Error('Invitation not found or already accepted/declined.');
                }
                return yield prisma_1.default.userOrganization.update({
                    where: { userOrgId: existingUserOrg.userOrgId },
                    data: { invitationStatus: 'ACCEPTED' },
                });
            }
            catch (error) {
                console.error("Error accepting invitation:", error);
                throw new Error("Failed to accept invitation");
            }
        });
    },
    declineInvitation(userId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUserOrg = yield prisma_1.default.userOrganization.findUnique({
                    where: {
                        userId_organizationId: {
                            userId,
                            organizationId,
                        },
                        invitationStatus: 'PENDING',
                    },
                });
                if (!existingUserOrg) {
                    throw new Error('Invitation not found or already accepted/declined.');
                }
                return yield prisma_1.default.userOrganization.update({
                    where: { userOrgId: existingUserOrg.userOrgId },
                    data: { invitationStatus: 'DECLINED' },
                });
            }
            catch (error) {
                console.error("Error declining invitation:", error);
                throw new Error("Failed to decline invitation");
            }
        });
    },
};
exports.default = userOrgService;
