import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const getOrderWithStatus: FastifyPluginAsync = async (fastify) => {
    fastify.get('/orders/:id/:status', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id, status } = request.params as { id: number, status: number };

        try {
            const orders = await prisma.orders.findMany({
                where: { client_id: Number(id), ...(status != 0 && { status: Number(status) }) }
            });

            reply.status(200).send(orders);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default getOrderWithStatus;