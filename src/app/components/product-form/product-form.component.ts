import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductFormData } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() product: Product | null = null;
  @Output() save = new EventEmitter<ProductFormData>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.form) {
      this.buildForm();
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      barcode: [this.product?.barcode ?? ''],
      name: [this.product?.name ?? '', [Validators.required, Validators.minLength(1)]],
      quantity: [this.product?.quantity ?? 0, [Validators.required, Validators.min(0)]],
      price: [this.product?.price ?? 0, [Validators.required, Validators.min(0)]]
    });
  }

  get isEditMode(): boolean {
    return this.product !== null;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const data: ProductFormData = {
      barcode: this.form.value.barcode ?? '',
      name: this.form.value.name,
      quantity: Number(this.form.value.quantity),
      price: Number(this.form.value.price)
    };
    this.save.emit(data);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  hasError(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }
}
