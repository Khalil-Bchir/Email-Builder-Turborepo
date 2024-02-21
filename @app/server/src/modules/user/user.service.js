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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../utils/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService = {
    // Create a new user
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = input, rest = __rest(input, ["password"]);
                // Generate a random salt
                const saltRounds = 10;
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                // Hash the password with the generated salt
                const hash = yield bcrypt_1.default.hash(password, salt);
                // Create the user with hashed password and salt
                return yield prisma_1.default.user.create({
                    data: Object.assign(Object.assign({}, rest), { password: hash, salt }),
                });
            }
            catch (e) {
                console.error('Error creating user:', e);
                throw e;
            }
        });
    },
    // Get all users
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma_1.default.user.findMany({
                    select: {
                        email: true,
                        username: true,
                        userId: true,
                    },
                });
            }
            catch (e) {
                console.error('Error retrieving all users:', e);
                throw e;
            }
        });
    },
    // Get user by ID
    getById(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        userId: Id,
                    },
                    select: {
                        email: true,
                        username: true,
                        userId: true,
                    },
                });
                if (!user) {
                    throw new Error(`User with ID ${Id} not found`);
                }
                return user;
            }
            catch (e) {
                console.error(`Error retrieving user with ID ${Id}:`, e);
                throw e;
            }
        });
    },
    // Update user by ID
    update(Id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Hash the new password if provided
                if (data.password) {
                    const saltRounds = 10;
                    const salt = yield bcrypt_1.default.genSalt(saltRounds);
                    data.password = yield bcrypt_1.default.hash(data.password, salt);
                }
                // Prepare the update data
                const userData = Object.assign(Object.assign(Object.assign({}, (data.email && { email: data.email })), (data.username && { username: data.username })), (data.password && { password: data.password }));
                // Update the user in the database
                const updatedUser = yield prisma_1.default.user.update({
                    where: { userId: Id },
                    data: userData,
                });
                if (!updatedUser) {
                    throw new Error(`User with ID ${Id} not found`);
                }
                return updatedUser;
            }
            catch (e) {
                console.error(`Error updating user with ID ${Id}:`, e);
                throw e;
            }
        });
    },
    delete(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteUser = yield prisma_1.default.user.delete({
                    where: {
                        userId: Id,
                    },
                });
                if (!deleteUser) {
                    throw new Error(`User with ID ${Id} not found`);
                }
                return `User with ID ${Id} was deleted successfully`;
            }
            catch (e) {
                console.error(`Error deleting user with ID ${Id}:`, e);
                throw e;
            }
        });
    },
};
exports.default = userService;
