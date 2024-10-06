import { FastifyReply, FastifyRequest, FastifyPluginAsync } from "fastify";
import prisma from "../db"; 
import bcrypt from 'bcryptjs';

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
}

const userRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const users = await prisma.users.findMany();
            reply.status(200).send(users);
        } catch (error) {
            reply.status(500).send({ error: 'Failed to retrieve users' });
        }
    });

    fastify.post('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        const data: Data = request.body as Data;
        const password = await bcrypt.hash(data.password, 10);

        try {
            const user = await prisma.users.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: password,
                    cpf: data.cpf,
                    cep: data.cep,
                    rua: data.rua,
                    cidade: data.cidade,
                    uf: data.uf,
                    numero: data.numero,
                    bairro: data.bairro
                }
            })

            const { password: userPasword, ...userWithoutPassword } = user;

            return reply.status(200).send(userWithoutPassword);
        } catch (error) {
            reply.status(500).send(error);
        }
    });

    fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        const { cpf, password } = request.body as Data;

        try {
            const user = await prisma.users.findFirst({
                where: { cpf: cpf }
            });

            if (!user) {
                return reply.status(404).send({ message: 'Usuário não encontrado.' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return reply.status(401).send({ message: 'Senha incorreta.' });
            }

            const { password: userPassword, ...userWithoutPassword } = user;

            return reply.status(200).send(userWithoutPassword);
        } catch (error) {
            console.error(error);
            return reply.status(500).send(error);
        }
    });
};

export default userRoutes;
