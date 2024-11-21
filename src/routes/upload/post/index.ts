import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import cloudinary from "../../../plugins/cloudnary";

const uploadPostRoute: FastifyPluginAsync = async (fastify) => {
    fastify.post('/upload', async (request: FastifyRequest, reply: FastifyReply) => {
        const file = await request.file(); 
        
        if (!file) {
          return reply.status(400).send({ error: 'Nenhum arquivo enviado!' });
        }
      
        try {
          const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: 'uploads' }, (error: any, result: unknown) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
      
            file.file.pipe(stream); 
          });
      
          return reply.status(201).send(result);
        } catch (error) {
          console.error('Erro ao fazer upload:', error);
          return reply.status(500).send({ error: error });
        }
      });
}

export default uploadPostRoute;