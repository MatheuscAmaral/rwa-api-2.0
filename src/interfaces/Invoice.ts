export interface Invoice {
  customer: string;
  billingType: string;
  value: number;
  dueDate: string;
  description?: string;
  daysAfterDueDateToRegistrationCancellation?: number;
  externalReference?: string;
  installmentCount?: number;
  totalValue?: number;
  installmentValue?: number;
  discount?: {
    value?: number;
    dueDateLimitDays?: number;
    type?: string;
  };
  interest?: {
    value?: number;
  };
  fine?: {
    value?: number;
    type?: string;
  };
  postalService?: boolean;
  split?: Array<{
    walletId: string;
    fixedValue?: number;
    percentualValue?: number;
    totalFixedValue?: number;
    externalReference?: string;
    description?: string;
  }>;
  callback?: {
    successUrl: string;
    autoRedirect?: boolean;
  };
}
