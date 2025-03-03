import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { ProductApiService } from '../services/product-api.service';
 
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productApi: ProductApiService
  ) {}

  // LOAD PRODUCTS
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productApi.getAllProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // ADD PRODUCT
  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap(({ product }) =>
        this.productApi.createProduct(product).pipe(
          map((created) => ProductActions.addProductSuccess({ product: created })),
          catchError((error) =>
            of(ProductActions.addProductFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // UPDATE PRODUCT
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      switchMap(({ product }) =>
        this.productApi.updateProduct(product).pipe(
          map((updated) => ProductActions.updateProductSuccess({ product: updated })),
          catchError((error) =>
            of(ProductActions.updateProductFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // DELETE PRODUCT
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productApi.deleteProduct(id).pipe(
          map(() => ProductActions.deleteProductSuccess({ id })),
          catchError((error) =>
            of(ProductActions.deleteProductFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
