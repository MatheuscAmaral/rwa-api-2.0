import { FastifyReply, FastifyRequest, FastifyPluginAsync } from "fastify";
import prisma from "../db"; 

interface Data {
    id: number
    name: string
    email: string
    password: string 
    cpf: string
    cep: number
    rua: string
    cidade: string
    uf: string
    numero: number
    bairro: string
}


const userRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const users = await prisma.users.findMany();
            reply.status(200).send(users);
        } catch (error) {
            reply.status(500).send({ error: 'Failed to retrieve users' });
        }
    });

    fastify.post('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        const data: Data = request.body as Data;

        try {
            const user = await prisma.users.create({
                data: data
            })

            return reply.status(200).send(user);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
};

export default userRoutes;
