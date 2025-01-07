import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const deleteOrder: FastifyPluginAsync = async (fastify) => {
    fastify.delete('/orders/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };
        
        try {
            const order = await prisma.orders.findUnique({
                where: { order_id: Number(id) }
            });

            if (!order) { 
                return reply.status(404).send("Pedido não encontrado");
            }

            const deleteOrderItems = await prisma.items_orders.deleteMany({
              where: { order_id: Number(id) }
            });

            if (deleteOrderItems) {
              await prisma.orders.delete({
                  where: { order_id: Number(id) }
              });
            }

            reply.status(200).send(order);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default deleteOrder;