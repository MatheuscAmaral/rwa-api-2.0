import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";
import bcrypt from "bcryptjs";

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

const registerUser: FastifyPluginAsync = async (fastify) => {
    fastify.post('/users/register', async (request: FastifyRequest, reply: FastifyReply) => {
        const data: Data = request.body as Data;
        const password = await bcrypt.hash(data.password, 10);

        try {
            const user = await prisma.users.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: password,
                    cpf: data.cpf,
                    cep: Number(data.cep),
                    rua: data.rua,
                    cidade: data.cidade,
                    uf: data.uf,
                    numero: Number(data.numero),
                    bairro: data.bairro
                }
            })

            const { password: userPasword, ...userWithoutPassword } = user;

            return reply.status(200).send(userWithoutPassword);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}


export default registerUser;