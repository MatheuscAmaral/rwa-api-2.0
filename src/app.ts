import fastify from "fastify";
import userRoutes from "../src/routes/users";

const app = fastify();

app.register(userRoutes);

app.listen({ port: 3333 }, function (err, address) {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
});