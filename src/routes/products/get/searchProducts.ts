import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const searchProducts: FastifyPluginAsync = async (fastify) => {
    fastify.get('/products/search/:query', async (request: FastifyRequest, reply: FastifyReply) => {
        const { query } = request.params as { query: string };

        try {
            let products; 

            if (query == "todos") {
                products = await prisma.products.findMany();    
            } else {
                products = await prisma.products.findMany({
                    where: { 
                        title: {
                            contains: query,
                            mode: 'insensitive'
                        } 
                    }
                });
            }

            reply.status(200).send(products);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default searchProducts;