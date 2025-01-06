import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const getDefault: FastifyPluginAsync = async (fastify) => {
    fastify.get('/gateways/default', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const defaultGateway = await prisma.gateways.findFirst({
              where: { status: 1 }
            });

            reply.status(200).send(defaultGateway);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default getDefault; 