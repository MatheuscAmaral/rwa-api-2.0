import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "../../../interfaces/IUser";
import prisma from "../../../../db";
import bcrypt from "bcryptjs";

const updateUserPassword: FastifyPluginAsync = async (fastify) => {
    fastify.put('/users/password/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };
        const data: IUser = request.body as IUser;
        const password = await bcrypt.hash(data.password, 10);

        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: Number(id)
                },
            });
            
            if (user) {
                const isPasswordValid = await bcrypt.compare(data.old_password, String(user?.password));

                if (isPasswordValid) {
                    const userUpdate = await prisma.users.update({
                        where: { id: Number(id) },
                        data: {
                            password: String(password)
                        }
                    })
    
                    reply.status(200).send(userUpdate);
                } else {
                    reply.status(500).send({ error: "A senha atual está incorreta!" });
                }
            }

        } catch (error) {
            reply.status(500).send({ error: error });
        }
    });
}

export default updateUserPassword;