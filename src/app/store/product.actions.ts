// src/app/store/product/product.actions.ts
import { createAction, props } from '@ngrx/store';
import { Product } from '../product.model';

/* Load Products */
export const loadProducts = createAction('[Product List] Load Products');
export const loadProductsSuccess = createAction(
  '[Product List] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product List] Load Products Failure',
  props<{ error: string }>()
);

/* Add Product */
export const addProduct = createAction(
  '[Product Form] Add Product',
  props<{ product: Omit<Product, 'id'> }>()
);
export const addProductSuccess = createAction(
  '[Product Form] Add Product Success',
  props<{ product: Product }>()
);
export const addProductFailure = createAction(
  '[Product Form] Add Product Failure',
  props<{ error: string }>()
);

/* Update Product */
export const updateProduct = createAction(
  '[Product Form] Update Product',
  props<{ product: Product }>()
);
export const updateProductSuccess = createAction(
  '[Product Form] Update Product Success',
  props<{ product: Product }>()
);
export const updateProductFailure = createAction(
  '[Product Form] Update Product Failure',
  props<{ error: string }>()
);

/* Delete Product */
export const deleteProduct = createAction(
  '[Product List] Delete Product',
  props<{ id: number }>()
);
export const deleteProductSuccess = createAction(
  '[Product List] Delete Product Success',
  props<{ id: number }>()
);
export const deleteProductFailure = createAction(
  '[Product List] Delete Product Failure',
  props<{ error: string }>()
);
