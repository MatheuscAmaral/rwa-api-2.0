import { FastifyPluginAsync } from "fastify";
import getInvoice from "./get/getInvoice";
import deleteInvoice from "./delete/deleteInvoice";

const invoicesRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.register(getInvoice);
    fastify.register(deleteInvoice);
}

export default invoicesRoutes;