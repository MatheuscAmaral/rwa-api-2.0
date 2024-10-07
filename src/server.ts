import fastify from "fastify";
import userRoutes from "./routes/users";
import cors from "@fastify/cors";
import productsRoutes from "./routes/products";
import statisticsRoutes from "./routes/statistics";

const app = fastify();

app.register(cors, {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(userRoutes);
app.register(productsRoutes);
app.register(statisticsRoutes);

app.listen({ port: 3333 }, function (err, address) {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
});