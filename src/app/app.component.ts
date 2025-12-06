import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Footer } from './shared/components/footer/footer';
import { COLORS } from './shared/Colors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  colors = COLORS;
}
