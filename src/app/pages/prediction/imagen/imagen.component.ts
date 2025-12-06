import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CornService } from '../../../core/services/maiz.service';
import { DetectionResponse } from '../../../core/interfaces/img';
import { COLORS } from '../../../shared/Colors';

@Component({
  selector: 'app-imagen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imagen.component.html',
  styleUrl: './imagen.component.css',
})
export class ImagenComponent {
  colors = COLORS;
  onBack = output<void>();

  image = signal<string | null>(null);
  processedImage = signal<string | null>(null);
  analyzing = signal(false);
  result = signal<any>(null);
  selectedFile: File | null = null;

  constructor(private toast: ToastrService, private cornService: CornService) {}

  handleUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Validaciones
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        this.toast.error('Tipo de archivo no permitido', 'Error');
        return;
      }

      if (file.size > maxSize) {
        this.toast.error(
          'El archivo es demasiado grande (máximo 5MB)',
          'Error'
        );
        return;
      }

      this.selectedFile = file;
      this.image.set(URL.createObjectURL(file));
      this.result.set(null);
      this.processedImage.set(null);
    }
  }

  runAnalysis() {
    if (!this.selectedFile) {
      this.toast.warning('No se ha seleccionado ningún archivo', 'Advertencia');
      return;
    }

    if (this.analyzing()) {
      this.toast.warning('Ya se está procesando una imagen', 'Espere');
      return;
    }

    this.analyzing.set(true);
    this.toast.info('Procesando imagen...', 'Espere');

    this.cornService.processImage(this.selectedFile).subscribe({
      next: (response) => {
        // Guardar imagen procesada en base64
        this.processedImage.set(`data:image/jpeg;base64,${response.image}`);

        // Calcular métricas basadas en la respuesta del API
        const count = response.detections;
        const grade = count > 100 ? 'A+' : count > 50 ? 'A' : 'B+';
        const avgSize = '1.2cm'; // Simulado
        const defects = '2%'; // Simulado

        this.result.set({
          count,
          grade,
          avgSize,
          defects,
          processingTime: response.processing_time_seconds.toFixed(2),
          confidence: (response.model_confidence_threshold * 100).toFixed(0),
        });

        this.toast.success('Imagen procesada exitosamente', 'Éxito');
      },
      error: (error) => {
        console.error('Error:', error);
        this.toast.error('Error en el procesamiento de la imagen', 'Error');
        this.analyzing.set(false);
      },
      complete: () => {
        this.analyzing.set(false);
      },
    });
  }
}
