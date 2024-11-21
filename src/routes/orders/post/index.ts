import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../../../db";
import { ItemsProps } from "../../../interfaces/itemsProps";

interface Data {
    qtd_pedida: [];
    qtd_atendida: [];
    tipo_desconto: [];
    valor_desconto: [];
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
const createOrder: FastifyPluginAsync = async (fastify) => {
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
                data.produto_id.map(async (produto_id, key: number) => {
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
}

export default createOrder;