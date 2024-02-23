import { FastifyInstance } from "fastify";

import authController from "./auth.controller";
import { $ref } from "./auth.schema";

async function authRoutes(app: FastifyInstance) {
    app.post(
        '/login',
        {
            schema: {
                body: $ref('loginSchema'),
                response: {
                    200: $ref('loginResponseSchema')
                }
            }
        },
        authController.loginHandler
    );

    app.post('/logout', authController.logoutHandler);
}

export default authRoutes;
