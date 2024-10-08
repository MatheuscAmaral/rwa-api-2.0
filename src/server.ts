import fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./routes/users";
import cors from "@fastify/cors";
import productsRoutes from "./routes/products";
import statisticsRoutes from "./routes/statistics";
import cloudinary from '../src/cloudnary'; 
import multipart from '@fastify/multipart';
import ordersRoutes from "./routes/orders";
import paymentMethodsRoutes from "./routes/paymentMethods";

const app = fastify();

app.register(cors, {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(multipart);

app.register(userRoutes);
app.register(productsRoutes);
app.register(statisticsRoutes);
app.register(ordersRoutes);
app.register(paymentMethodsRoutes);

app.post('/upload', async (request: FastifyRequest, reply: FastifyReply) => {
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

app.listen({ port: 3333 }, function (err, address) {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
});