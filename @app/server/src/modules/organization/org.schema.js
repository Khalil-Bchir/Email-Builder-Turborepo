"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.orgSchemas = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const orgCore = {
    name: zod_1.z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
};
const createOrgSchema = zod_1.z.object(Object.assign({}, orgCore));
const createOrgResponseSchema = zod_1.z.object(Object.assign(Object.assign({}, orgCore), { organizationId: zod_1.z.number() }));
const getOrgSchema = zod_1.z.object(Object.assign(Object.assign({}, orgCore), { organizationId: zod_1.z.number() }));
const getAllOrgSchema = zod_1.z.array(getOrgSchema);
const updateOrgSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
});
const updateOrgResponseSchema = zod_1.z.object(Object.assign({}, orgCore));
const models = {
    createOrgSchema,
    createOrgResponseSchema,
    getOrgSchema,
    getAllOrgSchema,
    updateOrgSchema,
    updateOrgResponseSchema,
};
_a = (0, fastify_zod_1.buildJsonSchemas)(models, { $id: "OrgSchema" }), exports.orgSchemas = _a.schemas, exports.$ref = _a.$ref;
