import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "../../../interfaces/IUser";
import prisma from "../../../../db";

const usersVerify: FastifyPluginAsync = async (fastify) => {
    fastify.post('/users/verify', async (request: FastifyRequest, reply: FastifyReply) => {
        const { cpf, email } = request.body as IUser;

        try {
            const userByCpf = await prisma.users.findFirst({
                where: {
                    cpf: cpf
                },
            });
            
            const userByEmail = await prisma.users.findFirst({
                where: {
                    email: email
                },
            });

            if (userByCpf && userByEmail) {
                return reply.status(404).send({ error: "O usuário já foi cadastrado!" });
            } else if (userByCpf) {
                return reply.status(404).send({ error: "O cpf já foi cadastrado!" });
            } else if (userByEmail) {
                return reply.status(404).send({ error: "O e-mail já foi cadastrado!" });
            }

            reply.status(200).send(false);
        } catch (error) {
            reply.status(500).send({ error: error });
        }
    });
}

export default usersVerify;