import { FastifyReply, FastifyRequest, FastifyPluginAsync } from "fastify";
import prisma from "../db"; 

interface Data {
    produto_id: number
    image: string
    title: string
    price: number
    size: number
    category: string
    flavor: string
    type_pack: number
    status: number
}

const productsRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/products', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const products = await prisma.products.findMany();

            reply.status(200).send(products);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
    
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

    fastify.get('/products/:query', async (request: FastifyRequest, reply: FastifyReply) => {
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

export default productsRoutes;