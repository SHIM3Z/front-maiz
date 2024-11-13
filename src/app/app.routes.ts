import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ImagenComponent } from './pages/imagen/imagen.component';
import { TiempoRealComponent } from './pages/tiempo-real/tiempo-real.component';

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.component').then((c) =>c.InicioComponent)
  },
  {
    path: 'imagen',
    loadComponent: () => import('./pages/imagen/imagen.component').then((c) =>c.ImagenComponent)
  },
  {
    path: 'treal',
    loadComponent: () => import('./pages/tiempo-real/tiempo-real.component').then((c) =>c.TiempoRealComponent)
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  }
];
