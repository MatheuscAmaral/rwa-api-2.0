import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const getProductsAdm: FastifyPluginAsync = async (fastify) => {
    fastify.get('/products/adm', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const products = await prisma.products.findMany({
                orderBy: [
                    {stock: "desc"},
                    {title: "asc"}
                ]
            });

            reply.status(200).send(products);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default getProductsAdm;