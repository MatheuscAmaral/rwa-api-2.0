import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

const getClient: FastifyPluginAsync = async (fastify) => {
  fastify.get("/asaas/clients/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };

    try {
      const clients = await fetch(`${process.env.SANDBOX_URL}/customers/${id}`, {
        headers: {
          "accept": "application/json",
          "access_token": ` ${process.env.SANDBOX_TOKEN}`
        }
      });

      const response = await clients.json();

      reply.status(200).send(response.data);
    } catch (error) {
      reply.status(500).send(error);
    }
  })
}

export default getClient;