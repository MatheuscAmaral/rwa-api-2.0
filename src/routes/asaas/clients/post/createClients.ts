import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { validateAsaasClients } from "../../../../helpers/validators/asaas/validateAsaasClients";

const createClients: FastifyPluginAsync = async (fastify) => {
  fastify.post("/asaas/clients", async (request: FastifyRequest, reply: FastifyReply) => {
    const data = await validateAsaasClients(request.body);

    try {
      const clients = await fetch(`${process.env.SANDBOX_URL}/customers`, {
        method: "POST",
        headers: {
          "accept": "application/json",
          "access_token": ` ${process.env.SANDBOX_TOKEN}`
        },
        body: JSON.stringify(data)
      });

      const response = await clients.json();

      reply.status(200).send(response.data);
    } catch (error) {
      reply.status(500).send(error);
    }
  })
}

export default createClients;