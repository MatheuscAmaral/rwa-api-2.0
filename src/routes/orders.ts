import fastify, { FastifyReply, FastifyRequest, FastifyPluginAsync } from "fastify";
import prisma from "../db"; 

interface Data {
    qtd_pedida: any;
    qtd_atendida: any;
    tipo_desconto: any;
    valor_desconto: any;
    pedido_id: number;
    total: number;
    descontos: number;
    cliente_id : number;
    valor_frete: number;
    formapag_id: number;
    cep: number;
    rua: string;
    cidade: string;
    uf: string;
    numero: string;
    bairro: string;
    status: number;
    produto_id: ItemsProps[]
}

interface ItemsProps {
    id: number;
    produto_id: [];
    pedido_id: number;
    qtd_pedida: [];
    qtd_atendida: [];
    tipo_desconto: [];
    valor_desconto: [];
}

const ordersRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/orders/:id/:status', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id, status } = request.params as { id: number, status: number };

        try {
            const orders = await prisma.pedidos.findMany({
                where: { cliente_id: Number(id), ...(status != 0 && { status: Number(status) }) }
            });

            reply.status(200).send(orders);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
    
    fastify.post('/orders', async (request: FastifyRequest, reply: FastifyReply) => {
        const data: Data = request.body as Data;
        
        try {
            const order = await prisma.pedidos.create({
                data: {
                    total: data.total,
                    descontos: data.descontos,
                    cliente_id: data.cliente_id,
                    valor_frete: data.valor_frete,
                    formapag_id: Number(data.formapag_id),
                    cep: data.cep,
                    rua: data.rua,
                    cidade: data.cidade,
                    uf: data.uf,
                    numero: Number(data.numero),
                    bairro: data.bairro,
                    status: Number(data.status)
                }
            });

            const id = order.pedido_id;

            if (data && Array.isArray(data.produto_id) && data.produto_id.length > 0) {
                data.produto_id.map(async (produto_id, key) => {
                    await prisma.pedido_item.create({
                        data: {
                            pedido_id: Number(id), 
                            produto_id: Number(produto_id), 
                            qtd_pedida: Number(data.qtd_pedida[key]),
                            qtd_atendida: Number(data.qtd_atendida[key]), 
                            tipo_desconto: Number(data.tipo_desconto[key]),
                            valor_desconto: Number(data.valor_desconto[key])
                        }
                    });

                    const product = await prisma.products.findUnique({
                        where: { produto_id: Number(produto_id) }
                    });

                    await prisma.products.update({
                        where: { produto_id: Number(produto_id) },
                        data: {
                            stock: Number(product?.stock) - Number(data.qtd_atendida)
                        }
                    })
                });
            }

            reply.status(200).send(order);
        } catch (error) {
            reply.status(500).send(error);
        }
    });

    fastify.get('/orders/items/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };

        try {
            const orders = await prisma.$queryRawUnsafe(`
                SELECT 
                    pi.id, pi.produto_id, pi.pedido_id, pi.qtd_pedida, pi.qtd_atendida, pi.tipo_desconto, pi.valor_desconto, 
                    pi."createdAt", pi."updatedAt", p.image, p.title, p.price, p.size, p.category, p.flavor, p.type_pack, p.stock
                FROM 
                    pedido_item pi
                INNER JOIN 
                    products p ON p.produto_id = pi.produto_id
                WHERE 
                    pi.pedido_id = ${Number(id)}
            `);
            

            reply.status(200).send(orders);
        } catch (error) {
            reply.status(500).send(error);
        }
    });

    fastify.get('/orders/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };

        try {
            const orders = await prisma.pedidos.findUnique({
                where: { pedido_id: Number(id) }
            });

            reply.status(200).send(orders);
        } catch (error) {
            reply.status(500).send(error);
        }
    });
}

export default ordersRoutes;