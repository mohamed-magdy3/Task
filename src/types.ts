export type Category = 'CAMERAS' | 'SENSORS' | 'ACCESSORIES' | 'PLAN';

export interface Variant {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number | string;
  originalPrice: number;
  savings?: string;
  variants?: Variant[];
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  variant?: Variant;
  quantity: number;
}
