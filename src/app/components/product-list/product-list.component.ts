import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductFormData } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  showForm = false;
  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getAll();
  }

  openCreateForm(): void {
    this.editingProduct = null;
    this.showForm = true;
  }

  onEdit(product: Product): void {
    this.editingProduct = product;
    this.showForm = true;
  }

  onSave(data: ProductFormData): void {
    if (this.editingProduct) {
      this.productService.update(this.editingProduct.id, data);
    } else {
      this.productService.create(data);
    }
    this.products = this.productService.getAll();
    this.showForm = false;
    this.editingProduct = null;
  }

  onCancel(): void {
    this.showForm = false;
    this.editingProduct = null;
  }

  onDelete(id: number): void {
    this.productService.delete(id);
    this.products = this.productService.getAll();
  }
}
