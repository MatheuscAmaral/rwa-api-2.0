export interface IUser {
  id: number
  name: string
  email: string
  user: string;
  password: string 
  cpf: string
  zipCode: number
  street: string
  city: string
  uf: string
  customer_id: string | null
  number: number
  neighborhood: string
  old_password: string
}