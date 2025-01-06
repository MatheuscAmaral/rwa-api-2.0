import { FastifyPluginAsync } from "fastify";
import getPayments from "./get/getPayments";
import createPayment from "./post/createPayment";
import updatePayment from "./update/updatePayments";

const paymentMethodsRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.register(getPayments);
    fastify.register(updatePayment);
    fastify.register(createPayment);
}

export default paymentMethodsRoutes;