import { z } from "zod";

const schema = z.object({
  name: z.string(),
  cpfCnpj: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  mobilePhone: z.string().optional(),
  address: z.string().optional(),
  addressNumber: z.string().optional(),
  complement: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
  externalReference: z.string().optional(),
  notificationDisabled: z.boolean().optional(),
  additionalEmails: z.string().optional(),
  municipalInscription: z.string().optional(),
  stateInscription: z.string().optional(),
  observations: z.string().optional(),
  groupName: z.string().optional(),
  company: z.string().optional()
});

export const validateAsaasClients = async (params: any) => {
  try {
    const data = await schema.parseAsync(params);

    return data;
  } catch (error) {
    return error;
  }
}