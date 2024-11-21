import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

interface Data {
    id: number;
    descricao: string;
    tipo: number;
    status: number;
}

const createPayment: FastifyPluginAsync = async (fastify) => {
    fastify.post('/payments', async (request: FastifyRequest, reply: FastifyReply) => {
        const data: Data = request.body as Data;

        try {
            const payments = await prisma.formas_pagamentos.create({
                data: data
            });

            reply.status(200).send(payments);
        } catch (error) {
            reply.status(500).send(error);
        }
    })
}

export default createPayment;