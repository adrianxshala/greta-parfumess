export type ProductSize = '15ml' | '35ml' | '100ml';

export interface Product {
  id: string;
  name: string;
  price: number; // Base price (default size, typically 35ml)
  category: 'men' | 'woman' | 'luxury-line' | 'unisex' | 'kids';
  notes: string[];
  description: string;
  image?: string; // Image URL
  price_15ml?: number; // Price for 15ml size
  price_35ml?: number; // Price for 35ml size
  price_100ml?: number; // Price for 100ml size
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: ProductSize; // Selected size when added to cart
}
