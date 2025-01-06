import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import InvoicesAsaas from "../../../services/asaas/invoices";

const invoicesAsaas = InvoicesAsaas();

const getInvoice: FastifyPluginAsync = async (fastify) => {
    fastify.get('/invoices/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };

        try {
            const invoice = await invoicesAsaas.getInvoice(id);
            const qrCode = invoice.billingType == 'PIX' ?  await invoicesAsaas.getQrCode(id) : null;
            const ticketCode = invoice.billingType == 'BOLETO' ?  await invoicesAsaas.getTicketCode(id) : null;

            reply.status(200).send({
              ...invoice,
              ...(qrCode && { qrCode }),
              ...(ticketCode && { ticketCode })
            });
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default getInvoice;