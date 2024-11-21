import { FastifyPluginAsync } from "fastify";
import getOrderWithStatus from "./get/getOrderWithStatus";
import createOrder from "./post";
import getItemsOrder from "./get/getItemsOrder";
import getOrder from "./get/getOrders";

const ordersRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.register(getOrder);
    fastify.register(getOrderWithStatus);
    fastify.register(getItemsOrder);
    fastify.register(createOrder);
}

export default ordersRoutes;