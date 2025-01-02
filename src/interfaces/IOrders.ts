import type { IOrderItems } from "./IOrderItems";

export interface IOrders {
  clientId: number;
  quantityOrdered: [];
  quantityServed: [];
  discountType: [];
  discountValue: [];
  orderId: number;
  total: number;
  discounts: number;
  shippingCost: number;
  paymentMethod: number;
  zipCode: number;
  street: string;
  city: string;
  uf: string;
  number: string;
  neighborhood: string;
  status: number;
  productId: IOrderItems[]
}