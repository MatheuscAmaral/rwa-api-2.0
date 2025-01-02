import { z } from "zod";

const schema = z.object({
  customer: z.string(),
  billingType: z.string(),
  value: z.number(),
  dueDate: z.date(),
  description: z.string().optional(),
  daysAfterDueDateToRegistrationCancellation: z.number().optional(),  
  externalReference: z.string().optional(),
  installmentCount: z.number().optional(),
  totalValue: z.number().optional(),
  installmentValue: z.number().optional(),
  discount: z.object({
      value: z.number().optional(),
      dueDateLimitDays: z.number().optional(),
      type: z.string().optional()
  }).optional(),
  interest: z.object({
      value: z.number().optional()
  }).optional(),
  fine: z.object({
      value: z.number().optional(),
      type: z.string().optional()
  }).optional(),
  postalService: z.boolean().optional(),  
  split: z.array(
      z.object({
          walletId: z.string(),
          fixedValue: z.number().optional(),
          percentualValue: z.number().optional(),
          totalFixedValue: z.number().optional(),
          externalReference: z.string().optional(),
          description: z.string().optional(),
      })
  ).optional(),
  callback: z.object({
      successUrl: z.string(),
      autoRedirect: z.boolean().optional()
  }).optional()
});

export const validateAsaasInvoices = async (params: any) => {
  try {
    const data = await schema.parseAsync(params);

    return data;
  } catch (error) {
    return error;
  }
}