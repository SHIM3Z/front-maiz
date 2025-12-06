import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { COLORS } from '../../Colors';

@Component({
  selector: 'app-404-page',
  standalone: true,
  imports: [],
  templateUrl: './404-page.html',
  styleUrl: './404-page.css',
})
export class NotFoundPage {
  colors = COLORS;

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home']);
  }
}
