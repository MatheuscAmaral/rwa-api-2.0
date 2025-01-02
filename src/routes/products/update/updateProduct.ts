import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IProducts } from "../../../interfaces/IProducts";
import prisma from "../../../../db";

const updateProduct: FastifyPluginAsync = async (fastify) => {
    fastify.put('/products/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };
        const data: IProducts = request.body as IProducts;
        
        try {
            const products = await prisma.products.findFirst({ where: { product_id: Number(id) } });

            if (!products) { 
                return reply.status(404).send("Produto não encontrado");
            }

            await prisma.products.update({
                where: { product_id: Number(id) },
                data: data
            });
            
            reply.status(200).send(products);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default updateProduct;