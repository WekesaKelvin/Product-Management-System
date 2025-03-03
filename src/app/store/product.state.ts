// Purpose: Define the state of the product store.  
import { Product } from '../product.model';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null
};
