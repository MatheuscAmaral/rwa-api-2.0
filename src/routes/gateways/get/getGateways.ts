import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const getGateways: FastifyPluginAsync = async (fastify) => {
    fastify.get('/gateways', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const gateways = await prisma.gateways.findMany();

            reply.status(200).send(gateways);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default getGateways; 