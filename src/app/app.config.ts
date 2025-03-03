
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { productReducer } from './store/product.reducer';
import { ProductEffects } from './store/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),  
    provideHttpClient(),

    // Register the NgRx store with your product slice
    provideStore({
      product: productReducer
    }),

    // Register the Effects
    provideEffects([ProductEffects]),
  ]
};
