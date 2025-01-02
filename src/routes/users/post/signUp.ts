import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IUser } from "../../../interfaces/IUser";
import prisma from "../../../../db";
import bcrypt from "bcryptjs";

const signUpUser: FastifyPluginAsync = async (fastify) => {
    fastify.post('/users/sign-up', async (request: FastifyRequest, reply: FastifyReply) => {
        const data: IUser = request.body as IUser;
        const password = await bcrypt.hash(data.password, 10);

        try {
            const user = await prisma.users.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: password,
                    cpf: data.cpf,
                    zip_code: Number(data.zipCode),
                    street: data.street,
                    city: data.city,
                    uf: data.uf,
                    number: Number(data.number),
                    neighborhood: data.neighborhood
                }
            })

            const { password: userPasword, ...userWithoutPassword } = user;

            return reply.status(200).send(userWithoutPassword);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}


export default signUpUser;