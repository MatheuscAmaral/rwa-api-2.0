import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";
import type { IGateways } from "../../../interfaces/IGateways";

const updateGateway: FastifyPluginAsync = async (fastify) => {
    fastify.put('/gateways/:id', async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: number };
      const data: IGateways = request.body as IGateways;

        try {
            const gateway = await prisma.gateways.findUnique({
              where: { id: Number(id) }
            });

            if (!gateway) { 
                return reply.status(404).send("Gateway não encontrado");
            }

            const updatedGateway = await prisma.gateways.update({
              where: { id: Number(id) },
              data: data
            });

            reply.status(200).send(updatedGateway);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default updateGateway;