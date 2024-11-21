import fastify from "fastify";
import { registerPlugins } from "./plugins";
import { registerRoutes } from "./routes";

const buildApp = () => {
    const app = fastify();
    app.register(registerPlugins);
    app.register(registerRoutes);

    return app;
}

export default buildApp;