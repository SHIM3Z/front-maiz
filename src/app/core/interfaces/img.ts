export interface img {
  labels: string;
  confidence: number;
  predict_image: boolean;
}

export interface DetectionResponse {
  image: string;
  detections: number;
  processing_time_seconds: number;
  model_confidence_threshold: number;
}
