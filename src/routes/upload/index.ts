import { FastifyPluginAsync } from "fastify";
import uploadPostRoute from "./post";

const uploadRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.register(uploadPostRoute);
}

export default uploadRoutes;