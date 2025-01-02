import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";
import type { IGateways } from "../../../interfaces/IGateways";

const createGateways: FastifyPluginAsync = async (fastify) => {
    fastify.post('/gateways', async (request: FastifyRequest, reply: FastifyReply) => {
      const data: IGateways = request.body as IGateways;

        try {
            const gateways = await prisma.gateways.create({
              data: data
            });

            reply.status(200).send(gateways);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default createGateways;