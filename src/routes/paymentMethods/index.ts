import { FastifyPluginAsync } from "fastify";
import getPayments from "./get/getPayments";
import createPayment from "./post/createPayment";

const paymentMethodsRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.register(getPayments);
    fastify.register(createPayment);
}

export default paymentMethodsRoutes;