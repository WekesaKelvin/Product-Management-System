// src/app/pages/product-form/product-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { Product } from '../../product.model';
import * as ProductActions from '../../store/product.actions';
import { selectProductById } from '../../store/product.selectors';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { switchMap, take } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatSnackBarModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      id: [0],
      name: [''],
      price: [0]
    });
  }

  ngOnInit(): void {
    // If we have an ID, it means we are in "edit" mode
    this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        if (idParam) {
          this.productId = +idParam;
          // Select product from store
          return this.store.select(selectProductById(this.productId)).pipe(take(1));
        }
        return [null];
      })
    ).subscribe((product) => {
      if (product) {
        this.productForm.patchValue({
          id: product.id,
          name: product.name,
          price: product.price
        });
      }
    });
  }

  onSubmit() {
    const formValue: Product = this.productForm.value;

    if (this.productId) {
      // Update existing product
      this.store.dispatch(ProductActions.updateProduct({ product: formValue }));
      this.openSnackBar('Product successfully updated!');
    } else {
      // Add new product (omit the ID, or pass 0—depends on your API)
      const { id, ...createData } = formValue;
      this.store.dispatch(ProductActions.addProduct({ product: createData }));
      this.openSnackBar('Product successfully added!');
    }

    // Reset the form
    this.productForm.reset({ id: 0, name: '', price: 0 });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
