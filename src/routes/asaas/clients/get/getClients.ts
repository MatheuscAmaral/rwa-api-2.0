import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

const getClients: FastifyPluginAsync = async (fastify) => {
  fastify.get("/asaas/clients", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const clients = await fetch(`${process.env.SANDBOX_URL}/customers`, {
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

export default getClients;