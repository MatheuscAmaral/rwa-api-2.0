import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const getOrders: FastifyPluginAsync = async (fastify) => {
    fastify.get('/orders', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const orders = await prisma.$queryRawUnsafe(`
               SELECT *, order_id, total, discounts, shipping_cost, orders.zip_code, orders.street, orders.number, orders.neighborhood, orders.city, orders.uf, orders.status FROM orders
               INNER JOIN users ON orders.client_id = users.id
               INNER JOIN payment_methods ON orders.payment_method = payment_methods.type
            `);

            reply.status(200).send(orders);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default getOrders;