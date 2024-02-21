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
const user_controller_1 = __importDefault(require("./user.controller"));
const user_schema_1 = require("./user.schema");
function userRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/', {
            schema: {
                body: (0, user_schema_1.$ref)('createUserSchema'),
                response: {
                    201: (0, user_schema_1.$ref)("createUserResponseSchema"),
                },
            },
        }, user_controller_1.default.registerHandler);
        app.get('/', {
            schema: {
                response: {
                    200: (0, user_schema_1.$ref)("getAllUsersSchema")
                }
            }
        }, user_controller_1.default.getAllHandler);
        app.get('/:id', {
            schema: {
                response: {
                    200: (0, user_schema_1.$ref)("getUserSchema")
                }
            }
        }, user_controller_1.default.getByIdHandler);
        app.put('/:id', {
            schema: {
                body: (0, user_schema_1.$ref)('updateUserSchema'),
                response: {
                    201: (0, user_schema_1.$ref)("updatedUserResponseSchema"),
                },
            },
        }, user_controller_1.default.updateHandler);
        app.delete("/:id", { schema: { params: { id: { type: "number" } } } }, user_controller_1.default.deleteHandler);
    });
}
exports.default = userRoutes;
