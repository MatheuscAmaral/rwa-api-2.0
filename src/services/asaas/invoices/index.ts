import { validateAsaasInvoices } from "../../../helpers/validators/asaas/validateAsaasInvoices";
import { validateCreditCardAsaas } from "../../../helpers/validators/asaas/validateCreditCardAsaas";
import type { ICreditCard } from "../../../interfaces/ICreditCard";
import type { Invoice } from "../../../interfaces/Invoice";

const InvoicesAsaas = () => {
  return {
    getInvoice: async (id: string) => {
      try {
        const invoice = await fetch(`${process.env.SANDBOX_URL}/payments/${id}`, {
          headers: {
            "accept": "application/json",
            "access_token": ` ${process.env.SANDBOX_TOKEN}`
          }
        });

        const response = await invoice.json();

        return response;
      } catch (error) {
        return (error);
      }
    },
    getInvoices: async () => {
      try {
        const invoices = await fetch(`${process.env.SANDBOX_URL}/payments`, {
          headers: {
            "accept": "application/json",
            "access_token": ` ${process.env.SANDBOX_TOKEN}`
          }
        });
  
        const response = await invoices.json();
  
        return response;
      } catch (error) {
        return (error);
      }
    },
    createInvoice: async (data: Invoice) => {
      try {
        const invoice = await fetch(`${process.env.SANDBOX_URL}/payments`, {
          method: "POST",
          headers: {
            "accept": "application/json",
            "access_token": `${process.env.SANDBOX_TOKEN}`
          },
          body: JSON.stringify(data)
        });
  
        const response = await invoice.json();
        return response;
      } catch (error) {
        return (error);
      }
    },
    getTicketCode: async (id: string) => {
      try {
        const invoice = await fetch(`${process.env.SANDBOX_URL}/payments/${id}/identificationField`, {
          headers: {
            "accept": "application/json",
            "access_token": ` ${process.env.SANDBOX_TOKEN}`
          }
        });
  
        const response = await invoice.json();
  
        return response;
      } catch (error) {
        return (error);
      }
    },
    getQrCode: async (id: string) => {
      try {
        const invoice = await fetch(`${process.env.SANDBOX_URL}/payments/${id}/pixQrCode`, {
          headers: {
            "accept": "application/json",
            "access_token": ` ${process.env.SANDBOX_TOKEN}`
          }
        });
  
        const response = await invoice.json();
  
        return response;
      } catch (error) {
        return (error);
      }
    },
    cancelInvoice: async (id: string) => {
      try {
        const invoice = await fetch(`${process.env.SANDBOX_URL}/payments/${id}`, {
          method: "DELETE",
          headers: {
            "accept": "application/json",
            "access_token": ` ${process.env.SANDBOX_TOKEN}`
          }
        });
  
        const response = await invoice.json();
  
        return response;
      } catch (error) {
        return error;
      }
    },
    payInvoiceWithCreditCard: async (params: ICreditCard, id: string) => {
      try {
        const invoice = await fetch(`${process.env.SANDBOX_URL}/payments/${id}/payWithCreditCard`, {
          method: "POST",
          headers: {
            "accept": "application/json",
            "access_token": `${process.env.SANDBOX_TOKEN}`
          },
          body: JSON.stringify(params)
        });
  
        const response = await invoice.json();
  
        return response;
      } catch (error) {
        return error;
      }
    }
  }
}

export default InvoicesAsaas;