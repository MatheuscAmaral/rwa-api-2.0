import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IPaymentMethods } from "../../../interfaces/IPaymentMethods";
import prisma from "../../../../db";

const updatePayment: FastifyPluginAsync = async (fastify) => {
    fastify.put('/payments/:id', async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: number };
      const data: IPaymentMethods = request.body as IPaymentMethods;

        try {
            const payments = await prisma.payment_methods.findUnique({
              where: { id: Number(id) }
            });

            if (!payments) { 
                return reply.status(404).send("Forma de pagamento não encontrada");
            }

            const updatedPayments = await prisma.payment_methods.update({
              where: { id: Number(id) },
              data: data
            });

            reply.status(200).send(updatedPayments);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default updatePayment;