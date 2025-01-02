import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

const getInvoice: FastifyPluginAsync = async (fastify) => {
  fastify.get("/asaas/invoices/:id", async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: number };

    try {
      const invoice = await fetch(`${process.env.SANDBOX_URL}/payments/${id}`, {
        headers: {
          "accept": "application/json",
          "access_token": ` ${process.env.SANDBOX_TOKEN}`
        }
      });

      const response = await invoice.json();

      reply.status(200).send(response.data);
    } catch (error) {
      reply.status(500).send(error);
    }
  })
}

export default getInvoice;