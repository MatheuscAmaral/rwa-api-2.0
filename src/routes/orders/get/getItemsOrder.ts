import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const getItemsOrder: FastifyPluginAsync = async (fastify) => {
    fastify.get('/orders/items/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };

        try {
            const orders = await prisma.$queryRawUnsafe(`
                SELECT 
                    pi.id, pi.product_id, pi.order_id, pi.quantity_ordered, pi.quantity_served, pi.discount_type, pi.discount_value, 
                    pi."createdAt", pi."updatedAt", p.image, p.title, p.price, p.size, p.category, p.flavor, p.type_pack, p.stock
                FROM 
                    items_orders pi
                INNER JOIN 
                    products p ON p.product_id = pi.product_id
                WHERE 
                    pi.order_id = ${Number(id)}
            `);

            reply.status(200).send(orders);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default getItemsOrder;