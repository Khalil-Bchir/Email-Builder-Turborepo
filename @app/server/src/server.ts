import {fastifyAutoload} from '@fastify/autoload'
import cookie, { FastifyCookieOptions } from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fjwt, { JWT } from "@fastify/jwt";
import dotenv from 'dotenv';
import Fastify, { FastifyReply, FastifyRequest } from "fastify";

import { authSchemas } from './modules/auth/auth.schema';
import { orgSchemas } from "./modules/organization/org.schema";
import { userSchemas } from "./modules/user/user.schema";
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

    app.register(fastifyAutoload , {
        dir: __dirname + '/modules',
        options: {
            prefix: '/api',
            dirNameRoutePrefix: true,
        }
    })

    return app;
}

export default buildServer;