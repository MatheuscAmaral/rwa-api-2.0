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

const updateUser: FastifyPluginAsync = async (fastify) => {
    fastify.put('/users/password/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as {id: number};
        const data: Data = request.body as Data;
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
                    reply.status(500).send({ error: "Senha atual incorreta!" });
                }
            }

        } catch (error) {
            reply.status(500).send({ error: error });
        }
    });
}

export default updateUser;