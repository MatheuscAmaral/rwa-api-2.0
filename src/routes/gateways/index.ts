import { FastifyPluginAsync } from "fastify";
import getGateways from "./get/getGateways";
import createGateways from "./post/createGateways";
import updateGateway from "./update/updateGateway";

const gatewaysRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(getGateways);
  fastify.register(updateGateway);
  fastify.register(createGateways);
}

export default gatewaysRoutes;