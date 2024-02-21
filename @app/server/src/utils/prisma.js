"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("@demo/database");
const prisma = new database_1.PrismaClient();
exports.default = prisma;
