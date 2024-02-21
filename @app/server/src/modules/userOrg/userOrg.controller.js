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
const userOrg_service_1 = __importDefault(require("./userOrg.service"));
const user_service_1 = __importDefault(require("../user/user.service"));
const org_service_1 = __importDefault(require("../organization/org.service"));
const userOrgController = {
    sendInvitationHandler: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, organizationId, role } = req.body;
                // Check if user exists
                const user = yield user_service_1.default.getById(userId);
                if (!user) {
                    return res.status(404).send({ error: "User not found" });
                }
                // Check if organization exists
                const organization = yield org_service_1.default.getById(organizationId);
                if (!organization) {
                    return res.status(404).send({ error: "Organization not found" });
                }
                const result = yield userOrg_service_1.default.sendInvitation(req.body);
                res.send(result);
            }
            catch (e) {
                console.error("Error sending invitation:", e);
                res.status(500).send(e);
            }
        });
    },
    acceptInvitationHandler: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, organizationId } = req.body;
                const result = yield userOrg_service_1.default.acceptInvitation(userId, organizationId);
                res.send(result);
            }
            catch (error) {
                console.error("Error accepting invitation:", error);
                res.status(500).send({ error: "Internal Server Error" });
            }
        });
    },
    declineInvitationHandler: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, organizationId } = req.body;
                const result = yield userOrg_service_1.default.declineInvitation(userId, organizationId);
                res.send(result);
            }
            catch (error) {
                console.error("Error declining invitation:", error);
                res.status(500).send({ error: "Internal Server Error" });
            }
        });
    },
};
exports.default = userOrgController;
