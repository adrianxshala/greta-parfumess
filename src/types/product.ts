export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'floral' | 'woody' | 'citrus' | 'oriental';
  notes: string[];
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
