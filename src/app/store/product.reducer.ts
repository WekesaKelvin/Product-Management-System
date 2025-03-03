// src/app/store/product/product.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { ProductState, initialProductState } from './product.state';
import * as ProductActions from './product.actions';

export const productReducer = createReducer(
  initialProductState,

  // LOAD
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ADD
  on(ProductActions.addProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: [...state.products, product]
  })),
  on(ProductActions.addProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // UPDATE
  on(ProductActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.updateProductSuccess, (state, { product }) => {
    const updatedList = state.products.map((p) =>
      p.id === product.id ? product : p
    );
    return {
      ...state,
      loading: false,
      products: updatedList
    };
  }),
  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // DELETE
  on(ProductActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    products: state.products.filter((p) => p.id !== id)
  })),
  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
