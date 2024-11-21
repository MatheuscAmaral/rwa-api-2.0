import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

const getPayments: FastifyPluginAsync = async (fastify) => {
    fastify.get('/payments', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const payments = await prisma.formas_pagamentos.findMany({
                where: { status: 1 }
            });

            reply.status(200).send(payments);
        } catch (error) {
            reply.status(500).send(error);
        }
    })
}

export default getPayments