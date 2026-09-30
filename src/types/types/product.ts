export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  emoji: string;
  description: string;
};
export type CartItem = Product & { quantity: number };
