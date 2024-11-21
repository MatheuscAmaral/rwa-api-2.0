import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const getUser: FastifyPluginAsync = async (fastify) => {
    fastify.get('/users/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };

        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: Number(id)
                }
            });

            reply.status(200).send(user);
        } catch (error) {
            reply.status(500).send({ error: error });
        }
    });
}

export default getUser;