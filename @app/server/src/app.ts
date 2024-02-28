
import dotenv from 'dotenv';

import buildServer from './server';


dotenv.config();

const app = buildServer();

async function main() {

    const options = {
        port: Number(process.env.PORT) || 3000,
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