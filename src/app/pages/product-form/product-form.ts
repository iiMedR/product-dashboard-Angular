import { Component, inject, signal } from '@angular/core';
import { 
  ReactiveFormsModule,
  FormBuilder,
  Validators
 } from '@angular/forms';
import { notBlankValidator } from '../../validators/not-blank.validator';

import { createProduct } from '../../models/Product';

import { JsonPipe } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, JsonPipe],
  selector: 'app-product-form',
  styleUrl: './product-form.css',
  templateUrl: './product-form.html',
})
export class ProductForm {

  private fb = inject(FormBuilder)

  productForm = this.fb.nonNullable.group({
    name: ['', [
      Validators.required,
      Validators.minLength(3),
      notBlankValidator
    ]],
    description: ['', [
      Validators.required
    ]],
    price: [0, [
      Validators.required,
      Validators.min(0)
    ]],
    category: ['',[
      Validators.required
    ]],
    stock: [0 ,[
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+$/)
    ]]
  })

  submittedProduct = signal<createProduct | null>(null);

  onSubmit(): void {
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return
    }

    const formData: createProduct = this.productForm.getRawValue();

    this.submittedProduct.set(formData)

    console.log('Product form data: ', formData)
  }
}
