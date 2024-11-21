import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const getItemsOrder: FastifyPluginAsync = async (fastify) => {
    fastify.get('/orders/items/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };

        try {
            const orders = await prisma.$queryRawUnsafe(`
                SELECT 
                    pi.id, pi.produto_id, pi.pedido_id, pi.qtd_pedida, pi.qtd_atendida, pi.tipo_desconto, pi.valor_desconto, 
                    pi."createdAt", pi."updatedAt", p.image, p.title, p.price, p.size, p.category, p.flavor, p.type_pack, p.stock
                FROM 
                    pedido_item pi
                INNER JOIN 
                    products p ON p.produto_id = pi.produto_id
                WHERE 
                    pi.pedido_id = ${Number(id)}
            `);
            

            reply.status(200).send(orders);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default getItemsOrder;