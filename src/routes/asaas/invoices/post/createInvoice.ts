import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { validateAsaasInvoices } from "../../../../helpers/validators/asaas/validateAsaasInvoices";

const createInvoice: FastifyPluginAsync = async (fastify) => {
  fastify.post("/asaas/invoices", async (request: FastifyRequest, reply: FastifyReply) => {
    const data = await validateAsaasInvoices(request.body);

    try {
      const invoice = await fetch(`${process.env.SANDBOX_URL}/payments`, {
        method: "POST",
        headers: {
          "accept": "application/json",
          "access_token": ` ${process.env.SANDBOX_TOKEN}`
        },
        body: JSON.stringify(data)
      });

      const response = await invoice.json();

      reply.status(200).send(response.data);
    } catch (error) {
      reply.status(500).send(error);
    }
  })
}

export default createInvoice;