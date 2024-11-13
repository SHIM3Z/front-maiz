import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './progressbar.component.html',
  styleUrl: './progressbar.component.css',
})
export class ProgressbarComponent { }
