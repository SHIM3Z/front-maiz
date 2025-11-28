import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DetectionResponse } from '../interfaces/img';

@Injectable({ providedIn: 'root' })
export class CornService {
  private apiUrl = {
    processImage: `${environment.API_URL}/process_image`,
    processDirectImage: `${environment.API_URL}/process_image/binary`,
  };

  constructor(private http: HttpClient) {}

  processImage(imageData: File) {
    const url = this.apiUrl.processImage;
    const formData = new FormData();
    formData.append('file', imageData);

    return this.http.post<DetectionResponse>(url, formData);
  }

  processDirectImage(imageData: File) {
    const url = this.apiUrl.processDirectImage;
    const formData = new FormData();
    formData.append('file', imageData);

    return this.http.post(url, formData, {
      responseType: 'blob',
    });
  }
}
