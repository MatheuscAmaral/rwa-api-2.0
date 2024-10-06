import fastify from "fastify";
import userRoutes from "../src/routes/users";
import cors from "@fastify/cors";

const app = fastify();

app.register(cors, {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(userRoutes);

app.listen({ port: 3333 }, function (err, address) {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
});