import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "../../../interfaces/IUser";
import prisma from "../../../../db";

const updateUser: FastifyPluginAsync = async (fastify) => {
    fastify.put('/users/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };
        const data: IUser = request.body as IUser;

        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: Number(id)
                },
            });
            
            if (user) {
                const userUpdate = await prisma.users.update({
                    where: { id: Number(id) },
                    data: data
                })
    
                reply.status(200).send(userUpdate);
            }

        } catch (error) {
            reply.status(500).send({ error: error });
        }
    });
}

export default updateUser;