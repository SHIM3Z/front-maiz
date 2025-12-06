import { Component, inject, signal } from '@angular/core';
import { COLORS } from '../../shared/Colors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  //Servicios
  router = inject(Router);
  colors = COLORS;
  navigate(view: string) {
    this.router.navigate([view]);
  }
}
