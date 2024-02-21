import Fastify, { FastifyInstance } from 'fastify';

// Create a separate function for initializing Fastify
const createFastifyInstance = (): FastifyInstance => {
  const fastify = Fastify({
    logger: true,
  });

  // Define your routes in a separate function for better organization
  fastify.get('/', async () => {
    return { message: 'Hello World!' };
  });

  return fastify;
};

// Start function now accepts a Fastify instance as a parameter
const start = async (fastify: FastifyInstance) => {
  try {
    // Explicitly cast to unknown and then to { port: number }
    const address = await fastify.listen(3000) as unknown as { port: number };

    console.log(`Server is listening on port ${address.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Create Fastify instance
const fastify = createFastifyInstance();

// Start the server
start(fastify);
