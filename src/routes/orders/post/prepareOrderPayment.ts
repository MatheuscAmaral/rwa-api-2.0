import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import ClientsAsaas from "../../../services/asaas/clients";
import InvoicesAsaas from "../../../services/asaas/invoices";
import prisma from "../../../../db";

const clientsAsaas = ClientsAsaas();
const invoicesAsaas = InvoicesAsaas();

const createClient = async (data: any) => {
  try {
    let client;

    if (data.customer_id) { 
      client = await clientsAsaas.getClient(String(data.customer_id))
    }
    
    if (!data.customer_id || (client && client.deleted)) {
     client = await clientsAsaas.createClient(data);
      
      await prisma.users.update({
        where: { id: data.user_id },
        data: {
          customer_id: client.id,
        },
      });
    }

    return client;
  } catch (error) {
    return error;
  }
}

const prepareOrderPayment: FastifyPluginAsync = async (fastify) => {
  fastify.post("/orders/prepare", async (request: FastifyRequest, reply: FastifyReply) => {
    const data = request.body as any;
    const billingType = data.paymentMethod == 1 ? 'BOLETO' : data.paymentMethod == 2 ? 'CREDIT_CARD' : 'PIX';
    const today = new Date();
    const formattedToday = billingType === 'BOLETO'
      ? new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0]
      : today.toISOString().split('T')[0];

    try {
      const gateway = await prisma.gateways.findFirst({ where: { status: 1 } });
      const defaultGateway = gateway && gateway.description.toLocaleLowerCase().trim();
      let client;
      let invoice;

      if (!defaultGateway) {
        return reply.status(404).send("Gateway padrão não encontrado");
      }

      if (defaultGateway == 'asaas') {
        client = await createClient(data);

        invoice = await invoicesAsaas.createInvoice({
          customer: client.id,
          billingType: billingType,
          value: data.total,
          dueDate: formattedToday,
          ...(data.installmentValue && { installmentValue: data.installmentValue }),
          callback: {
            successUrl: 'https://rwasuplementos.com/pedidos'
          }
        });

        if (billingType == 'BOLETO') {
          const ticketCode = await invoicesAsaas.getTicketCode(invoice.id);
          invoice.ticketCode = ticketCode;
        }

        if (billingType == 'PIX') {
          const qrCode = await invoicesAsaas.getQrCode(invoice.id);
          invoice.qrCode = qrCode;
        }

        if (billingType == 'CREDIT_CARD') {
          const creditCard = await invoicesAsaas.payInvoiceWithCreditCard(
            {
              creditCard: {
                holderName: data.creditCard.holderName,
                number: data.creditCard.number,
                expiryMonth: data.creditCard.expiryMonth,
                expiryYear: data.creditCard.expiryYear,
                ccv: data.creditCard.ccv
              },
              creditCardHolderInfo: {
                name: data.creditCardHolderInfo.name,
                email: data.creditCardHolderInfo.email,
                cpfCnpj: data.creditCardHolderInfo.cpfCnpj,
                postalCode: data.creditCardHolderInfo.postalCode,
                addressNumber: data.creditCardHolderInfo.addressNumber,
                phone: data.creditCardHolderInfo.phone,
              }
            }, invoice.id);

            invoice.creditCard = creditCard;
        }

        if (invoice && invoice.errors) {
          return reply.status(500).send(invoice);
        }
      }
      
      if (client && client.errors) {
        return reply.status(500).send(client);
      }

      return reply.status(200).send({ client, invoice });
    } catch (error) {
      reply.status(500).send(error);
    }
  })
}

export default prepareOrderPayment;