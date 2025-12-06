import { Component, inject, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { COLORS } from '../../Colors';
import { CornIcon } from '../corn-icon/corn-icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CornIcon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  //Servicios
  router = inject(Router);
  // Propiedad para acceder a los colores en el HTML
  colors = COLORS;

  // Método auxiliar para limpiar el HTML
  navigate(view: string) {
    this.router.navigate([view]);
  }
}
