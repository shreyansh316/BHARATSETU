
import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Upload, 
  X, 
  RefreshCw, 
  Download,
  Check,
  AlertTriangle,
  FileImage,
  Maximize2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CameraUploadProps {
  onFileCapture: (file: File) => void;
  onClose?: () => void;
  title?: string;
  description?: string;
}

const CameraUpload: React.FC<CameraUploadProps> = ({ 
  onFileCapture, 
  onClose, 
  title = "Document Upload",
  description = "Take a photo or upload a document"
}) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const requestCameraPermission = useCallback(async () => {
    try {
      setPermissionDenied(false);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' // Use back camera if available
        } 
      });
      
      setStream(mediaStream);
      setIsCameraActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      toast({
        title: "Camera Access Granted",
        description: "You can now take photos of your documents",
      });
    } catch (error) {
      console.error('Camera permission denied:', error);
      setPermissionDenied(true);
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to take photos, or upload a file instead",
        variant: "destructive"
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob and create object URL
    canvas.toBlob((blob) => {
      if (blob) {
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);
        
        // Create file from blob
        const file = new File([blob], `document-${Date.now()}.jpg`, { 
          type: 'image/jpeg' 
        });
        
        onFileCapture(file);
        stopCamera();
        
        toast({
          title: "Photo Captured",
          description: "Document photo has been captured successfully",
        });
      }
    }, 'image/jpeg', 0.9);
  }, [onFileCapture, stopCamera, toast]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file",
          variant: "destructive"
        });
        setIsProcessing(false);
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive"
        });
        setIsProcessing(false);
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
      onFileCapture(file);
      setIsProcessing(false);
      
      toast({
        title: "File Uploaded",
        description: "Document has been uploaded successfully",
      });
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    requestCameraPermission();
  };

  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = `document-${Date.now()}.jpg`;
      link.click();
    }
  };

  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (capturedImage) {
        URL.revokeObjectURL(capturedImage);
      }
    };
  }, [stream, capturedImage]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="w-5 h-5" />
              <span>{title}</span>
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {!isCameraActive && !capturedImage && (
            <div className="text-center space-y-4 py-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={requestCameraPermission}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  disabled={permissionDenied}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {permissionDenied ? 'Camera Access Denied' : 'Take Photo'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isProcessing ? 'Processing...' : 'Upload File'}
                </Button>
              </div>
              
              {permissionDenied && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <div className="text-left">
                      <h4 className="font-medium text-orange-800">Camera Access Required</h4>
                      <p className="text-sm text-orange-600">
                        Please enable camera permission in your browser settings or upload a file instead.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FileImage className="w-4 h-4 text-blue-500" />
                  <span>JPG, PNG supported</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4 text-green-500" />
                  <span>Max 10MB file size</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-purple-500" />
                  <span>High quality capture</span>
                </div>
              </div>
            </div>
          )}

          {isCameraActive && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 border-2 border-dashed border-white/50 m-4 rounded-lg pointer-events-none" />
                <Badge className="absolute top-2 left-2 bg-red-500">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1" />
                  Recording
                </Badge>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={capturePhoto}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Capture Photo
                </Button>
                
                <Button variant="outline" onClick={stopCamera}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {capturedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Captured document"
                  className="w-full h-64 sm:h-80 object-cover rounded-lg"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={downloadImage}
                  className="absolute top-2 right-2"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={retakePhoto}
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retake
                </Button>
                
                <Button
                  onClick={() => {
                    toast({
                      title: "Document Processed",
                      description: "Your document has been successfully processed",
                    });
                    onClose?.();
                  }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Confirm & Process
                </Button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>
    </div>
  );
};

export default CameraUpload;
