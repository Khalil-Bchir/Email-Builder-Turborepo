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
const userOrg_controller_1 = __importDefault(require("./userOrg.controller"));
const userOrg_schema_1 = require("./userOrg.schema");
function userOrgRoute(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/send', {
            schema: {
                body: (0, userOrg_schema_1.$ref)('sendInvitationSchema'),
                response: {
                    201: (0, userOrg_schema_1.$ref)('sendInvitationResponseSchema')
                }
            }
        }, userOrg_controller_1.default.sendInvitationHandler);
        app.post('/accept', {
            schema: {
                body: (0, userOrg_schema_1.$ref)('invitationAnswer'),
                response: {
                    201: (0, userOrg_schema_1.$ref)('invitationAnswerResponse')
                }
            }
        }, userOrg_controller_1.default.acceptInvitationHandler);
        app.post('/decline', {
            schema: {
                body: (0, userOrg_schema_1.$ref)('invitationAnswer'),
                response: {
                    201: (0, userOrg_schema_1.$ref)('invitationAnswerResponse')
                }
            }
        }, userOrg_controller_1.default.declineInvitationHandler);
    });
}
exports.default = userOrgRoute;
