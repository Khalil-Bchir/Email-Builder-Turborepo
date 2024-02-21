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
const org_controller_1 = __importDefault(require("./org.controller"));
const org_schema_1 = require("./org.schema");
function orgRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/', {
            schema: {
                body: (0, org_schema_1.$ref)('createOrgSchema'),
                response: {
                    201: (0, org_schema_1.$ref)('createOrgResponseSchema')
                }
            }
        }, org_controller_1.default.createHandler);
        app.get('/', {
            schema: {
                response: {
                    200: (0, org_schema_1.$ref)('getAllOrgSchema')
                }
            }
        }, org_controller_1.default.getAllHandler);
        app.get('/:organizationId', {
            schema: {
                response: {
                    200: (0, org_schema_1.$ref)('getOrgSchema')
                }
            }
        }, org_controller_1.default.getByIdHandler);
        app.put('/:organizationId', {
            schema: {
                body: (0, org_schema_1.$ref)('updateOrgSchema'),
                response: {
                    200: (0, org_schema_1.$ref)('updateOrgResponseSchema')
                }
            }
        }, org_controller_1.default.updateHandler);
        app.delete('/:organizationId', { schema: { params: { id: { type: "number" } } } }, org_controller_1.default.deleteHandler);
    });
}
exports.default = orgRoutes;
