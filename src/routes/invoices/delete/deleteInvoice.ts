import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import InvoicesAsaas from "../../../services/asaas/invoices";

const invoicesAsaas = InvoicesAsaas();

const deleteInvoice: FastifyPluginAsync = async (fastify) => {
    fastify.delete('/invoices/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };

        try {
            const invoice = await invoicesAsaas.cancelInvoice(id);

            reply.status(200).send(invoice);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default deleteInvoice;