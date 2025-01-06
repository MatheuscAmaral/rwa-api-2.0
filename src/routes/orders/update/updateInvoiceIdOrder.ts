import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const updateInvoiceIdOrder: FastifyPluginAsync = async (fastify) => {
    fastify.put('/orders/invoice/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };
        const data = request.body as { invoice_id: string };

        try {
            const order = await prisma.orders.findUnique({
                where: { order_id: Number(id) }
            });

            if (!order) { 
                return reply.status(404).send("Pedido não encontrado");
            }

            console.log(order)

            await prisma.orders.update({
                where: { order_id: Number(id) },
                data: {
                    invoice_id: data.invoice_id
                }
            });

            reply.status(200).send(order);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default updateInvoiceIdOrder;