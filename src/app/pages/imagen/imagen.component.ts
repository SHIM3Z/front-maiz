import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-imagen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imagen.component.html',
  styleUrl: './imagen.component.css'
})
export class ImagenComponent {
  imageBase64: string | null = null;
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Llamada al backend para procesar la imagen
    // this.http.post<any>('http://127.0.0.1:8000/process_image/', formData)
    this.http.post<any>('https://ldzcc7vk-8000.brs.devtunnels.ms/process_image/', formData)
    .subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);  // Ver la respuesta completa
        if (response && response.image) {
          this.imageBase64 = response.image;
        } else {
          console.error('Respuesta inválida del servidor:', response);
        }
      },
      error: (err) => {
        console.error('Error al subir la imagen:', err);
      }
    });
  }
}
