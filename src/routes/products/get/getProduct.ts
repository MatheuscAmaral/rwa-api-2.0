import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const getProduct: FastifyPluginAsync = async (fastify) => {
    fastify.get('/products/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };

        try {
            let products = await prisma.products.findUnique({
                where: { product_id: Number(id) }
            });   

            reply.status(200).send(products);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default getProduct;