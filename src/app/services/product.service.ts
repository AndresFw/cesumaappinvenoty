import { Injectable } from '@angular/core';
import { Product, ProductFormData } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private nextId = 4;
  private products: Product[] = [
    { id: 1, barcode: '7501055302427', name: 'Agua Mineral 1L', quantity: 120, price: 12.50 },
    { id: 2, barcode: '7501000625240', name: 'Refresco Cola 600ml', quantity: 85, price: 18.00 },
    { id: 3, barcode: '7503003400274', name: 'Galletas Surtidas', quantity: 60, price: 25.00 },
  ];

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  create(data: ProductFormData): Product {
    const product: Product = { id: this.nextId++, ...data };
    this.products.push(product);
    return product;
  }

  update(id: number, data: ProductFormData): Product | undefined {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    this.products[index] = { id, ...data };
    return this.products[index];
  }

  delete(id: number): boolean {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }
}
