export interface Medicine {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Medicine {
  quantity: number;
}

export interface OrderDetails {
  name: string;
  mobile: string;
  address: string;
}