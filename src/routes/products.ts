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
    stock: number
    type_pack: string
    status: number
}

const productsRoutes: FastifyPluginAsync = async (fastify) => {
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

    fastify.get('/products/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };

        try {
            let products = await prisma.products.findUnique({
                where: { produto_id: Number(id) }
            });   

            reply.status(200).send(products);
        } catch (error) {
            reply.status(500).send(error);
        }
    });

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

export default productsRoutes;