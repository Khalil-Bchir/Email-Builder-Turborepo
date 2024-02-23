import fjwt, { JWT } from "@fastify/jwt";
import dotenv from 'dotenv';
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyCors from '@fastify/cors';
import cookie, { FastifyCookieOptions } from '@fastify/cookie';

import authRoutes from './modules/auth/auth.route';
import { authSchemas } from './modules/auth/auth.schema';
import orgRoutes from "./modules/organization/org.route";
import { orgSchemas } from "./modules/organization/org.schema";
import userRoutes from './modules/user/user.route';
import { userSchemas } from "./modules/user/user.schema";
import userOrgRoute from "./modules/userOrg/userOrg.route";
import { userOrgSchemas } from "./modules/userOrg/userOrg.schema";

dotenv.config();

declare module "fastify" {
    interface FastifyRequest {
        jwt: JWT;
    }
    export interface FastifyInstance {
        authenticate: any;
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        user: {
            id: number;
            email: string;
            name: string;
        };
    }
}

function buildServer() {

    const app = Fastify();
    app.register(fastifyCors);

    const SECRET_KEY = process.env.SECRET_KEY || 'secret-key';

    app.register(fjwt, {
        secret: SECRET_KEY,
    });

    app.register(cookie, {
        secret: 'my-secret',
        parseOptions: {},
    } as FastifyCookieOptions);

    app.decorate(
        "authenticate",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify();
            } catch (e) {
                return reply.send(e);
            }
        }
    );

    app.get("/healthcheck", async function () {
        return { status: "OK" };
    });

    app.addHook("preHandler", (req, reply, next) => {
        req.jwt = app.jwt;
        return next();
    });

    const allSchemas = [...userSchemas, ...orgSchemas, ...userOrgSchemas, ...authSchemas];

    for (const schema of allSchemas) {
        app.addSchema(schema);
    }

    app.register(userRoutes, { prefix: '/api/user' });
    app.register(orgRoutes, { prefix: '/api/organization' });
    app.register(userOrgRoute, { prefix: '/api/invitation' });
    app.register(authRoutes, { prefix: '/api' });

    return app;
}

export default buildServer;