import fastify from "fastify";
import userRoutes from "./users";
import productsRoutes from "./products";
import statisticsRoutes from "./statistics";
import ordersRoutes from "./orders";
import paymentMethodsRoutes from "./paymentMethods";
import uploadRoute from "./upload/post";

export const registerRoutes = () => {
    const app = fastify();

    app.register(ordersRoutes);
    app.register(uploadRoute);
    app.register(productsRoutes);
    app.register(statisticsRoutes);

    app.register(userRoutes);
    app.register(paymentMethodsRoutes);
}
