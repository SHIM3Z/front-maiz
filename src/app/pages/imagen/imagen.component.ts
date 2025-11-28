import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CornService } from '../../core/services/maiz.service';

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

  constructor(private toast: ToastrService, private cornService: CornService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];

    // Validaciones adicionales
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        this.toast.error('Tipo de archivo no permitido', 'Error');
        event.target.value = null; // Limpiar selección
        return;
      }

      if (file.size > maxSize) {
        this.toast.error(
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
      this.toast.warning('No se ha seleccionado ningún archivo', 'Advertencia');
      return;
    }

    // Validación adicional por si acaso
    if (this.isLoading) {
      this.toast.warning('Ya se está procesando una imagen', 'Espere');
      return;
    }

    // Deshabilitar botón y mostrar loading
    this.isLoading = true;

    // Mostrar toast de carga
    this.toast.info('Procesando imagen...', 'Espere');

    // Llamada al backend
    this.cornService.processImage(this.selectedFile).subscribe({
      next: (response) => {
        if (response && response.image) {
          this.imageBase64 = response.image;
          this.toast.success('Imagen procesada exitosamente', 'Éxito');
        }
      },
      error: (error) => {
        this.toast.error('Error en el procesamiento de la imagen', 'Error');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  uploadImage2() {
    // Validaciones múltiples
    if (!this.selectedFile) {
      this.toast.warning('No se ha seleccionado ningún archivo', 'Advertencia');
      return;
    }

    // Validación adicional por si acaso
    if (this.isLoading) {
      this.toast.warning('Ya se está procesando una imagen', 'Espere');
      return;
    }
    this.isLoading = true;

    this.cornService.processDirectImage(this.selectedFile).subscribe({
      next: (response) => {
        const imageUrl = URL.createObjectURL(response);
        this.imageBase64 = imageUrl;
        // Aquí puedes manejar la respuesta del backend
        this.toast.success('Imagen procesada exitosamente', 'Éxito');
      },
      error: (error) => {
        this.toast.error('Error en el procesamiento de la imagen', 'Error');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
