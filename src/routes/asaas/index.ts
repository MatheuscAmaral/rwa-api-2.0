import { FastifyPluginAsync } from "fastify";
import clientsRoutes from "./clients";
import invoicesRoutes from "./invoices";

const asaasRoutes: FastifyPluginAsync = async (fastify) => {
   fastify.register(clientsRoutes);
   fastify.register(invoicesRoutes);
}

export default asaasRoutes;