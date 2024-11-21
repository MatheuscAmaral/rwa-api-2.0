import { FastifyPluginAsync } from "fastify";
import getStatistics from "./get/getStatistics";

const statisticsRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.register(getStatistics);
}

export default statisticsRoutes;