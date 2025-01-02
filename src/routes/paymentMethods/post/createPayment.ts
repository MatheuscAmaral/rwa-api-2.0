import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IPaymentMethods } from "../../../interfaces/IPaymentMethods";
import prisma from "../../../../db";

const createPayment: FastifyPluginAsync = async (fastify) => {
    fastify.post('/payments', async (request: FastifyRequest, reply: FastifyReply) => {
        const data: IPaymentMethods = request.body as IPaymentMethods;

        try {
            const payments = await prisma.payment_methods.create({
                data: data
            });

            reply.status(200).send(payments);
        } catch (error) {
            reply.status(500).send(error);
        }
    })
}

export default createPayment;