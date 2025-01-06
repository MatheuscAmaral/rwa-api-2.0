import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const updateStatusOrder: FastifyPluginAsync = async (fastify) => {
    fastify.put('/orders/status/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };
        const data = request.body as { status: number };

        try {
            const order = await prisma.orders.findUnique({
                where: { order_id: Number(id) }
            });

            if (!order) { 
                return reply.status(404).send("Pedido não encontrado");
            }

            await prisma.orders.update({
                where: { order_id: Number(id) },
                data: {
                    status: data.status
                }
            });

            reply.status(200).send(order);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default updateStatusOrder;