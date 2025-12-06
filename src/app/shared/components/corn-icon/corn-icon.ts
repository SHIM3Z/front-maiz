import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-corn-icon',
  standalone: true,
  imports: [],
  templateUrl: './corn-icon.html',
  styleUrl: './corn-icon.css',
})
export class CornIcon {
  @Input() size = 24;
  @Input() color = 'currentColor';
}
