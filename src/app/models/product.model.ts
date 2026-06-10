export interface Product {
  id: number;
  barcode: string;
  name: string;
  quantity: number;
  price: number;
}

export type ProductFormData = Omit<Product, 'id'>;
