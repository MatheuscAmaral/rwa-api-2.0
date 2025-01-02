import { FastifyPluginAsync } from "fastify";
import getOrderWithStatus from "./get/getOrderWithStatus";
import createOrder from "./post";
import getItemsOrder from "./get/getItemsOrder";
import getOrder from "./get/getOrder";
import getOrders from "./get/getOrders";
import updateOrder from "./update/updateOrder";

const ordersRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.register(getOrder);
    fastify.register(getOrders);
    fastify.register(getOrderWithStatus);
    fastify.register(getItemsOrder);
    fastify.register(createOrder);
    fastify.register(updateOrder);
}

export default ordersRoutes;