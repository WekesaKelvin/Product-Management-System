// src/app/store/product/product.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductState = createFeatureSelector<ProductState>('product');

export const selectAllProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectLoading = createSelector(
  selectProductState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectProductState,
  (state) => state.error
);

export const selectProductById = (id: number) =>
  createSelector(selectAllProducts, (products) =>
    products.find((p) => p.id === id)
  );
