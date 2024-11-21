import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";

interface Data {
    id: number
    name: string
    email: string
    user: string;
    password: string 
    cpf: string
    cep: number
    rua: string
    cidade: string
    uf: string
    numero: number
    bairro: string
    old_password: string
}

const usersVerify: FastifyPluginAsync = async (fastify) => {
    fastify.post('/users/verify', async (request: FastifyRequest, reply: FastifyReply) => {
        const { cpf, email } = request.body as Data;

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