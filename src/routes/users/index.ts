import { FastifyPluginAsync } from "fastify";
import getUsers from "./get/getUsers";
import getUser from "./get/getUser";
import registerUser from "./post/register";
import usersVerify from "./post/usersVerify";
import updateUser from "./put/updateUser";

const userRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.register(getUsers);
    fastify.register(getUser);
    fastify.register(registerUser);
    fastify.register(usersVerify);
    fastify.register(updateUser);
}

export default userRoutes;