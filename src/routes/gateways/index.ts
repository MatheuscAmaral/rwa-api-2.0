import { FastifyPluginAsync } from "fastify";
import getGateways from "./get/getGateways";
import createGateways from "./post/createGateways";
import updateGateway from "./update/updateGateway";
import getDefault from "./get/getDefault";

const gatewaysRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(getDefault);
  fastify.register(getGateways);
  fastify.register(updateGateway);
  fastify.register(createGateways);
}

export default gatewaysRoutes;