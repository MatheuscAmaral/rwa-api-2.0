import { FastifyPluginAsync } from "fastify";
import getClients from "./get/getClients";
import createClients from "./post/createClients";
import getClient from "./get/getClient";

const clientsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(getClient);
  fastify.register(getClients);
  fastify.register(createClients);
}

export default clientsRoutes;