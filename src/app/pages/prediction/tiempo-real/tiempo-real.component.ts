import { Component, output, signal } from '@angular/core';
import { COLORS } from '../../../shared/Colors';

@Component({
  selector: 'app-tiempo-real',
  standalone: true,
  imports: [],
  templateUrl: './tiempo-real.component.html',
  styleUrl: './tiempo-real.component.css',
})
export class TiempoRealComponent {
  colors = COLORS;
  onBack = output<void>(); // Nuevo output API de Angular 17+

  detectedData = signal<{
    quality: string;
    health: string;
    type: string;
  } | null>(null);

  ngOnInit() {
    // Simular detección después de 3 segundos
    setTimeout(() => {
      this.detectedData.set({
        quality: 'Premium',
        health: '98%',
        type: 'Maíz Amarillo Duro',
      });
    }, 3000);
  }
}
