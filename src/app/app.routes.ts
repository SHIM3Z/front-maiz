import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ImagenComponent } from './pages/imagen/imagen.component';
import { TiempoRealComponent } from './pages/tiempo-real/tiempo-real.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/inicio/inicio.component').then((m) =>m.InicioComponent),

  },
];
