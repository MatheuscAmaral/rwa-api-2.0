import { z } from "zod";

const schema = z.object({
  creditCard: z.object({
    holderName: z.string(),
    number: z.string(),
    expiryMonth: z.string(),
    expiryYear: z.string(),
    cvv: z.string()
  }),
  creditCardHolderInfo: z.object({
      name: z.string(),
      email: z.string(),
      cpfCnpj: z.string(),
      postalCode: z.string(),
      addressNumber: z.string(),
      addressComplement: z.string(),
      phone: z.string(),
      mobilePhone: z.string()
  })
});

export const validateCreditCardAsaas = async (params: any) => {
  try {
    const data = await schema.parseAsync(params);

    return data;
  } catch (error) {
    return error;
  }
}