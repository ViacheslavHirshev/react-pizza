export interface ICartItem {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface IPizza {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
}

export interface INewOrder {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: ICartItem[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
  status: string;
}

export interface ICustomerOrder {
  address: string;
  cart: ICartItem[];
  customer: string;
  phone: string;
  priority: boolean;
}
