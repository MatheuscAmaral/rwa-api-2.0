import { FastifyPluginAsync } from "fastify";
import getOrderWithStatus from "./get/getOrderWithStatus";
import createOrder from "./post/createOrder";
import getItemsOrder from "./get/getItemsOrder";
import getOrder from "./get/getOrder";
import getOrders from "./get/getOrders";
import updateOrder from "./update/updateOrder";
import prepareOrderPayment from "./post/prepareOrderPayment";
import updateInvoiceIdOrder from "./update/updateInvoiceIdOrder";
import updateStatusOrder from "./update/updateStatusOrder";

const ordersRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.register(getOrder);
    fastify.register(getOrders);
    fastify.register(getOrderWithStatus);
    fastify.register(getItemsOrder);
    fastify.register(createOrder);
    fastify.register(updateOrder);
    fastify.register(updateInvoiceIdOrder);
    fastify.register(updateStatusOrder);
    fastify.register(prepareOrderPayment);
}

export default ordersRoutes;