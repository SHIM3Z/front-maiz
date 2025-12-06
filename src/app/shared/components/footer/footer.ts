import { Component } from '@angular/core';
import { COLORS } from '../../Colors';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  colors = COLORS;
}
