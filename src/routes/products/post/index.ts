import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

interface Data {
    produto_id: number
    image: string
    title: string
    price: number
    size: number
    category: string
    flavor: string
    stock: number
    type_pack: string
    status: number
}

const createProduct: FastifyPluginAsync = async (fastify) => {
    fastify.post('/products', async (request: FastifyRequest, reply: FastifyReply) => {
        const data: Data = request.body as Data;
        
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