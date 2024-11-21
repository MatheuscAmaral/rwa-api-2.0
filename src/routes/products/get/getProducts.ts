import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const getProducts: FastifyPluginAsync = async (fastify) => {
    fastify.get('/products', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const productsWhey = await prisma.products.findMany({
                where: { category: "1" },
                orderBy: [
                    {
                        stock: "desc"
                    },
                    {
                        title: "asc"
                    }
                ]
            });

            const productsCreatina = await prisma.products.findMany({
                where: { category: "2" },
                orderBy: [
                    {
                        stock: "desc"
                    },
                    {
                        title: "asc"
                    }
                ]
            });

            const productsOthers = await prisma.products.findMany({
                where: { category: "3" },
                orderBy: [
                    {
                        stock: "desc"
                    },
                    {
                        title: "asc"
                    }
                ]
            });

            const products = {
                whey: productsWhey,
                creatina: productsCreatina,
                others: productsOthers
            }

            reply.status(200).send(products);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default getProducts;