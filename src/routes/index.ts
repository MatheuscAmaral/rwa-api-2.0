import { type FastifyInstance } from "fastify";
import userRoutes from "./users";
import productsRoutes from "./products";
import statisticsRoutes from "./statistics";
import ordersRoutes from "./orders";
import paymentMethodsRoutes from "./paymentMethods";
import uploadRoute from "./upload/post";
import gatewaysRoutes from "./gateways";
import invoicesRoutes from "./invoices";

export const registerRoutes = (app: FastifyInstance) => {
    app.register(ordersRoutes);
    app.register(uploadRoute);
    app.register(productsRoutes);
    app.register(statisticsRoutes);
    app.register(userRoutes);
    app.register(paymentMethodsRoutes);
    app.register(gatewaysRoutes);
    app.register(invoicesRoutes);
}
