import { validateAsaasClients } from "../../../helpers/validators/asaas/validateAsaasClients";

const ClientsAsaas = () => {
  return {
    getClients: async () => {
      try {
        const clients = await fetch(`${process.env.SANDBOX_URL}/customers`, {
          headers: {
            "accept": "application/json",
            "access_token": ` ${process.env.SANDBOX_TOKEN}`,
            "content-type": 'application/json',
          }
        });
  
        const response = await clients.json();
  
        return response;
      } catch (error) {
        return (error);
      }
    },
    getClient: async (customer: string) => {
      try {
        const client = await fetch(`${process.env.SANDBOX_URL}/customers/${customer}`, {
          headers: {
            "accept": "application/json",
            "access_token": `${process.env.SANDBOX_TOKEN}`,
            "content-type": 'application/json',
          }
        });

        const response = await client.json();

        return response;
      } catch (error) {
        return (error);
      }
    },
    createClient: async (params: any) => {
      const data = await validateAsaasClients(params);

      try {
        const clients = await fetch(`${process.env.SANDBOX_URL}/customers`, {
          method: "POST",
          headers: {
            "accept": 'application/json',
            "access_token": `${process.env.SANDBOX_TOKEN}`,
            "content-type": 'application/json',
          },
          body: JSON.stringify(data)
        });
  
        const response = await clients.json();

        return response;
      } catch (error) {
        console.error(error);
        return (error);
      }
    },
  }
}

export default ClientsAsaas;