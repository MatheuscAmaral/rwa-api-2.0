import { FastifyPluginAsync } from "fastify";
import getUser from "./get/getUser";
import getUsers from "./get/getUsers";
import updateUser from "./put/updateUser";
import updateUserPassword from "./put/updateUserPassword";
import usersVerify from "./post/usersVerify";
import signInUser from "./post/signIn";
import signUpUser from "./post/signUp";

const userRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.register(getUsers);
    fastify.register(getUser);
    fastify.register(signInUser);
    fastify.register(signUpUser);
    fastify.register(usersVerify);
    fastify.register(updateUser);
    fastify.register(updateUserPassword);
}

export default userRoutes;