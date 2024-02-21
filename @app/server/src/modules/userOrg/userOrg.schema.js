"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.userOrgSchemas = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const userOrgCore = {
    userId: zod_1.z.number({
        required_error: "User Id is required",
        invalid_type_error: "User Id must be a number",
    }),
    organizationId: zod_1.z.number({
        required_error: "Organization Id is required",
        invalid_type_error: "Organization Id must be a number",
    }),
    role: zod_1.z.string({
        required_error: "Role is required",
        invalid_type_error: "Role must be a string",
    }),
};
const sendInvitationSchema = zod_1.z.object(Object.assign({}, userOrgCore));
const sendInvitationResponseSchema = zod_1.z.object(Object.assign(Object.assign({}, userOrgCore), { invitationStatus: zod_1.z.enum(["PENDING", "ACCEPTED", "DECLINED"], {
        required_error: "Invitation Status is required",
        invalid_type_error: "Invitation Status must be a valid enum value",
    }) }));
const invitationAnswer = zod_1.z.object({
    userId: zod_1.z.number({
        required_error: "User Id is required",
        invalid_type_error: "User Id must be a number",
    }),
    organizationId: zod_1.z.number({
        required_error: "Organization Id is required",
        invalid_type_error: "Organization Id must be a number",
    }),
});
const invitationAnswerResponse = zod_1.z.object(Object.assign(Object.assign({}, userOrgCore), { invitationStatus: zod_1.z.enum(["PENDING", "ACCEPTED", "DECLINED"], {
        required_error: "Invitation Status is required",
        invalid_type_error: "Invitation Status must be a valid enum value",
    }) }));
const models = {
    invitationAnswer,
    sendInvitationSchema,
    sendInvitationResponseSchema,
    invitationAnswerResponse,
};
_a = (0, fastify_zod_1.buildJsonSchemas)(models, { $id: "UserOrgSchemas" }), exports.userOrgSchemas = _a.schemas, exports.$ref = _a.$ref;
