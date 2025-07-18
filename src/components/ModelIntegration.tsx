import React from 'react';

interface EmotionData {
  emotion: string;
  confidence: number;
  color: string;
}

// Mock emotion detection function - replace with your actual model integration
export const analyzeEmotion = async (imageData: string): Promise<EmotionData[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock emotion detection results
  const emotions: EmotionData[] = [
    { emotion: 'happy', confidence: Math.random() * 0.4 + 0.3, color: '#10B981' },
    { emotion: 'sad', confidence: Math.random() * 0.3 + 0.1, color: '#3B82F6' },
    { emotion: 'angry', confidence: Math.random() * 0.2 + 0.05, color: '#EF4444' },
    { emotion: 'surprised', confidence: Math.random() * 0.25 + 0.1, color: '#F59E0B' },
    { emotion: 'neutral', confidence: Math.random() * 0.3 + 0.2, color: '#6B7280' },
    { emotion: 'fear', confidence: Math.random() * 0.15 + 0.05, color: '#8B5CF6' },
    { emotion: 'disgust', confidence: Math.random() * 0.1 + 0.02, color: '#EC4899' }
  ];

  // Normalize to ensure total doesn't exceed 1
  const total = emotions.reduce((sum, emotion) => sum + emotion.confidence, 0);
  const normalized = emotions.map(emotion => ({
    ...emotion,
    confidence: emotion.confidence / total
  }));

  // Sort by confidence descending
  return normalized.sort((a, b) => b.confidence - a.confidence);
};

// Integration guide component for developers
const ModelIntegration: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">
        🔗 Model Integration Guide
      </h3>
      <div className="space-y-3 text-sm text-blue-700">
        <p>
          <strong>Replace the mock function</strong> in <code className="bg-blue-100 px-2 py-1 rounded">analyzeEmotion</code> with your actual deep learning model integration:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>TensorFlow.js models: Load and run inference directly in the browser</li>
          <li>API endpoints: Send image data to your Python/Flask/FastAPI backend</li>
          <li>Cloud services: Integrate with AWS Rekognition, Google Cloud Vision, or Azure Face API</li>
          <li>ONNX models: Use ONNX.js for optimized model inference</li>
        </ul>
        <p className="mt-3">
          The function should return an array of emotion objects with confidence scores between 0-1.
        </p>
      </div>
    </div>
  );
};

export default ModelIntegration;