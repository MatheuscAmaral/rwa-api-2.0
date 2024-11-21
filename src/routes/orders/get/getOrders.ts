import fastify, { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const getOrder: FastifyPluginAsync = async (fastify) => {
    fastify.get('/orders/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };

        try {
            const orders = await prisma.pedidos.findUnique({
                where: { pedido_id: Number(id) }
            });

            reply.status(200).send(orders);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default getOrder;