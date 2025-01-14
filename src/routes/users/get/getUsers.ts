import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const getUsers: FastifyPluginAsync = async (fastify) => {
    fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const users = await prisma.users.findMany();
            reply.status(200).send(users);
        } catch (error) {
            reply.status(500).send({ error: 'Failed to retrieve users' });
        }
    });
}

export default getUsers;