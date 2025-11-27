import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

interface ImageProcessResponse {
  image?: string;
  error?: string;
}

@Component({
  selector: 'app-imagen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imagen.component.html',
  styleUrl: './imagen.component.css',
})
export class ImagenComponent {
  imageBase64: string | null = null;
  selectedFile: File | null = null;
  isLoading = false;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];

    // Validaciones adicionales
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        this.toastr.error('Tipo de archivo no permitido', 'Error');
        event.target.value = null; // Limpiar selección
        return;
      }

      if (file.size > maxSize) {
        this.toastr.error(
          'El archivo es demasiado grande (máximo 5MB)',
          'Error'
        );
        event.target.value = null; // Limpiar selección
        return;
      }

      this.selectedFile = file;
    }
  }

  uploadImage() {
    // Validaciones múltiples
    if (!this.selectedFile) {
      this.toastr.warning(
        'No se ha seleccionado ningún archivo',
        'Advertencia'
      );
      return;
    }

    // Validación adicional por si acaso
    if (this.isLoading) {
      this.toastr.warning('Ya se está procesando una imagen', 'Espere');
      return;
    }

    // Preparar datos
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Deshabilitar botón y mostrar loading
    this.isLoading = true;

    // Configurar URL
    const apiUrl = 'http://127.0.0.1:8000/process_image/';
    // const apiUrl = 'https://ldzcc7vk-8000.brs.devtunnels.ms/process_image/';

    // Mostrar toast de carga
    this.toastr.info('Procesando imagen...', 'Espere');

    // Llamada al backend
    this.http
      .post<ImageProcessResponse>(apiUrl, formData)
      .pipe(
        // Manejo de errores personalizado
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Error desconocido';

          if (error.error instanceof ErrorEvent) {
            // Error del lado del cliente
            errorMessage = `Error de red: ${error.error.message}`;
          } else {
            // Error del lado del servidor
            errorMessage = `Error del servidor: ${error.status} - ${error.statusText}`;
          }

          this.toastr.error(errorMessage, 'Error en la subida');
          return of(null); // Continuar el flujo
        }),
        // Asegurar que se ejecute independientemente del resultado
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.image) {
            this.imageBase64 = response.image;
            this.toastr.success('Imagen procesada exitosamente', 'Éxito');
          } else if (response && response.error) {
            this.toastr.error(response.error, 'Error en el procesamiento');
          }
        },
      });
  }
}
