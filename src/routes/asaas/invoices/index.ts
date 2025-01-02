import { FastifyPluginAsync } from "fastify";
import getInvoice from "./get/getInvoice";
import getInvoices from "./get/getInvoices";

const invoicesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(getInvoice);
  fastify.register(getInvoices);
}

export default invoicesRoutes;