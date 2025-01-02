import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "../../../interfaces/IUser";
import prisma from "../../../../db";
import bcrypt from "bcryptjs";

const signInUser: FastifyPluginAsync = async (fastify) => {
    fastify.post('/users/sign-in', async (request: FastifyRequest, reply: FastifyReply) => {
        const data: IUser = request.body as IUser;

        try {
            const user = await prisma.users.findUnique({
                where: {
                    cpf: data.cpf
                }
            });

            if (!user) {
                return reply.status(404).send({ error: "Usuário não encontrado!" });
            }

            if (user.status != 1) {
                return reply.status(500).send({ error: "Usuário inativo!" });
            }

            const isValidPassword = await bcrypt.compare(data.password, user.password);

            if (!isValidPassword) {
                return reply.status(500).send({ error: "Senha incorreta!" });
            } else {
                const { password, ...userWithoutPassword } = user;
                return reply.status(200).send(userWithoutPassword);
            }
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}


export default signInUser;