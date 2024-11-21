import { FastifyPluginAsync } from "fastify";
import getProducts from "./get/getProducts";
import getProductsAdm from "./get/getProductsAdm";
import getProduct from "./get/getProduct";
import searchProducts from "./get/searchProducts";
import createProduct from "./post";

const productsRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.register(getProducts);
    fastify.register(getProductsAdm);
    fastify.register(getProduct);
    fastify.register(searchProducts);
    fastify.register(createProduct);
}

export default productsRoutes;