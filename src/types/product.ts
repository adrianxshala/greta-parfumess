export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'floral' | 'woody' | 'citrus' | 'oriental';
  notes: string[];
  description: string;
  image?: string; // Image URL
}

export interface CartItem extends Product {
  quantity: number;
}
