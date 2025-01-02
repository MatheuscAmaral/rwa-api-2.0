import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

const getInvoices: FastifyPluginAsync = async (fastify) => {
  fastify.get("/asaas/invoices", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const invoices = await fetch(`${process.env.SANDBOX_URL}/payments`, {
        headers: {
          "accept": "application/json",
          "access_token": ` ${process.env.SANDBOX_TOKEN}`
        }
      });

      const response = await invoices.json();

      reply.status(200).send(response.data);
    } catch (error) {
      reply.status(500).send(error);
    }
  })
}

export default getInvoices;