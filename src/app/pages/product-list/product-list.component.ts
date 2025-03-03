
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '../../product.model';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

import * as ProductActions from '../../store/product.actions';
import { selectAllProducts } from '../../store/product.selectors';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Dispatch action to load products from API
    this.store.dispatch(ProductActions.loadProducts());
    // Select the products as an observable
    this.products$ = this.store.select(selectAllProducts);
  }

  deleteProduct(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this product?'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Dispatch the delete action
        this.store.dispatch(ProductActions.deleteProduct({ id: productId }));
      }
    });
  }
}
