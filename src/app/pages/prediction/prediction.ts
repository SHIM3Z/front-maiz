import { Component, inject, signal } from '@angular/core';
import { COLORS } from '../../shared/Colors';
import { TiempoRealComponent } from './tiempo-real/tiempo-real.component';
import { ImagenComponent } from './imagen/imagen.component';
import { Router } from '@angular/router';
type ViewState = 'landing' | 'prediction';
type PredictionMode = 'none' | 'realtime' | 'upload';

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [TiempoRealComponent, ImagenComponent],
  templateUrl: './prediction.html',
  styleUrl: './prediction.css',
})
export class Prediction {
  //Servicios
  router = inject(Router);

  colors = COLORS;
  view = signal<ViewState>('landing');
  mode = signal<PredictionMode>('none');

  navigate(view: string) {
    this.router.navigate([view]);
  }
}
