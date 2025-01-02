import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IProducts } from "../../../interfaces/IProducts";
import prisma from "../../../../db";

const createProduct: FastifyPluginAsync = async (fastify) => {
    fastify.post('/products', async (request: FastifyRequest, reply: FastifyReply) => {
        const data: IProducts = request.body as IProducts;
        
        try {
            const products = await prisma.products.create({
                data: data
            });
            
            reply.status(200).send(products);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default createProduct;