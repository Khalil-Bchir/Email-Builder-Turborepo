"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.userSchemas = exports.updatedUserResponseSchema = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
const userCore = {
    email: zod_1.z
        .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    })
        .email(),
    username: zod_1.z.string({
        required_error: "username is required",
        invalid_type_error: "username must be a string",
    }),
};
const createUserSchema = zod_1.z.object(Object.assign(Object.assign({}, userCore), { password: zod_1.z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }) }));
const createUserResponseSchema = zod_1.z.object(Object.assign({ userId: zod_1.z.number() }, userCore));
const getUserSchema = zod_1.z.object(Object.assign({ userId: zod_1.z.number() }, userCore));
const getAllUsersSchema = zod_1.z.array(getUserSchema);
const updateUserSchema = zod_1.z.object(Object.assign(Object.assign({}, userCore), { email: userCore.email.optional(), username: userCore.username.optional(), password: zod_1.z.string({
        required_error: 'Password must be a string',
        invalid_type_error: 'Password must be a string',
    }).optional() }));
exports.updatedUserResponseSchema = zod_1.z.object(Object.assign({}, userCore));
const models = {
    createUserSchema,
    createUserResponseSchema,
    getUserSchema,
    getAllUsersSchema,
    updateUserSchema,
    updatedUserResponseSchema: exports.updatedUserResponseSchema,
};
_a = (0, fastify_zod_1.buildJsonSchemas)(models, { $id: "UserSchema" }), exports.userSchemas = _a.schemas, exports.$ref = _a.$ref;
