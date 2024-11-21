import { FastifyReply, FastifyRequest, FastifyPluginAsync } from "fastify";
import prisma from "../../../../db"; 

const getStatistics: FastifyPluginAsync = async (fastify) => {
    fastify.get('/statistics', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const products = await prisma.products.count();

            const statistics = {
                products: products
            }

            reply.status(200).send(statistics);
        } catch (error) {
            reply.status(500).send(error)
        }
    })
}

export default getStatistics;