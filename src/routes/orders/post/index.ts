import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { IOrders } from "../../../interfaces/IOrders";
import prisma from "../../../../db";

const createOrder: FastifyPluginAsync = async (fastify) => {
    fastify.post('/orders', async (request: FastifyRequest, reply: FastifyReply) => {
        const data: IOrders = request.body as IOrders;
        
        try {
            const order = await prisma.orders.create({
                data: {
                    total: data.total,
                    discounts: data.discounts,
                    client_id: data.clientId,
                    shipping_cost: data.shippingCost,
                    payment_method: Number(data.paymentMethod),
                    zip_code: data.zipCode,
                    street: data.street,
                    city: data.city,
                    uf: data.uf,
                    number: Number(data.number),
                    neighborhood: data.neighborhood,
                    status: Number(data.status)
                }
            });

            const id = order.order_id;

            if (data && Array.isArray(data.productId) && data.productId.length > 0) {
                data.productId.map(async (productId, key: number) => {
                    await prisma.items_orders.create({
                        data: {
                            order_id: Number(id), 
                            product_id: Number(productId), 
                            quantity_ordered: Number(data.quantityOrdered[key]),
                            quantity_served: Number(data.quantityServed[key]), 
                            discount_type: Number(data.discountType[key]),
                            discount_value: Number(data.discountValue[key])
                        }
                    });

                    const product = await prisma.products.findUnique({
                        where: { product_id: Number(productId) }
                    });

                    await prisma.products.update({
                        where: { product_id: Number(productId) },
                        data: {
                            stock: Number(product?.stock) - Number(data.quantityServed)
                        }
                    })
                });
            }

            reply.status(200).send(order);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default createOrder;