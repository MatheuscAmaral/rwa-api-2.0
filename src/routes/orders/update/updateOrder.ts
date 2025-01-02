import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IOrders } from "../../../interfaces/IOrders";
import prisma from "../../../../db";

const updateOrder: FastifyPluginAsync = async (fastify) => {
    fastify.put('/orders/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };
        const data: IOrders = request.body as IOrders;
        
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
                    zip_code: data.zipCode,
                    street: data.street,
                    city: data.city,
                    uf: data.uf,
                    number: Number(data.number),
                    neighborhood: data.neighborhood,
                    status: Number(data.status)
                }
            });

            reply.status(200).send(order);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default updateOrder;