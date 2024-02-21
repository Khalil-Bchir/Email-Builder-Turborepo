import fastifyCors from '@fastify/cors';
import fastify from 'fastify';

import orgRoutes from "./modules/organization/org.route";
import {orgSchemas} from "./modules/organization/org.schema";
import userRoutes from './modules/user/user.route';
import {userSchemas} from "./modules/user/user.schema";
import userOrgRoute from "./modules/userOrg/userOrg.route";
import {userOrgSchemas} from "./modules/userOrg/userOrg.schema";

const app = fastify();

app.get('/api/healthCheck', async function () {
    return { status: 'ok' };
});

async function main() {

    app.register(fastifyCors);

    const allSchemas = [...userSchemas, ...orgSchemas, ...userOrgSchemas];

    for (const schema of allSchemas) {
        app.addSchema(schema);
    }

    app.register(userRoutes, { prefix: '/api/user' });
    app.register(orgRoutes, { prefix: '/api/organization' });
    app.register(userOrgRoute, {prefix: '/api/invitation'})

    const options = {
        port: Number(process.env.PORT) || 3000,
        host: '0.0.0.0',
    };

    try {
        await app.listen(options);
        console.log(`Server running at http://localhost:${options.port}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();