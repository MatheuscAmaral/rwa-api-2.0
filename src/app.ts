import fastify from "fastify";
import { registerPlugins } from "./plugins";
import { registerRoutes } from "./routes";

const buildApp = () => {
    const app = fastify();
    registerPlugins(app);
    registerRoutes(app);

    return app;
}

export default buildApp;
