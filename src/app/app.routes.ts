import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/inicio/inicio.component').then((c) => c.InicioComponent),
  },
  {
    path: 'prediction',
    loadComponent: () =>
      import('./pages/prediction/prediction').then((c) => c.Prediction),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./shared/components/404-page/404-page').then(
        (c) => c.NotFoundPage
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
