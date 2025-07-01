
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  Crosshair,
  Globe,
  Shield
} from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address?: string;
  accuracy?: number;
}

interface GPSLocationTrackerProps {
  onLocationFound: (location: Location) => void;
}

const GPSLocationTracker = ({ onLocationFound }: GPSLocationTrackerProps) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const locationData: Location = {
          lat: latitude,
          lng: longitude,
          accuracy: accuracy
        };

        try {
          // Reverse geocoding to get address
          const address = await reverseGeocode(latitude, longitude);
          locationData.address = address;
        } catch (geocodeError) {
          console.warn('Reverse geocoding failed:', geocodeError);
        }

        setLocation(locationData);
        setAccuracy(accuracy);
        setLoading(false);
        onLocationFound(locationData);
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access denied by user');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable');
            break;
          case error.TIMEOUT:
            setError('Location request timed out');
            break;
          default:
            setError('An unknown error occurred');
            break;
        }
      },
      options
    );
  };

  const startWatchingLocation = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const id = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const locationData: Location = {
          lat: latitude,
          lng: longitude,
          accuracy: accuracy
        };

        try {
          const address = await reverseGeocode(latitude, longitude);
          locationData.address = address;
        } catch (geocodeError) {
          console.warn('Reverse geocoding failed:', geocodeError);
        }

        setLocation(locationData);
        setAccuracy(accuracy);
        onLocationFound(locationData);
      },
      (error) => {
        console.error('Watch position error:', error);
      },
      options
    );

    setWatchId(id);
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    // Using a free reverse geocoding service
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const data = await response.json();
      
      if (data.city && data.principalSubdivision) {
        return `${data.city}, ${data.principalSubdivision}, ${data.countryName}`;
      } else if (data.locality) {
        return `${data.locality}, ${data.countryName}`;
      } else {
        return `${data.countryName}`;
      }
    } catch (error) {
      throw new Error('Geocoding failed');
    }
  };

  const getAccuracyLevel = (acc: number | null) => {
    if (!acc) return { level: 'Unknown', color: 'gray' };
    if (acc <= 10) return { level: 'Excellent', color: 'green' };
    if (acc <= 50) return { level: 'Good', color: 'blue' };
    if (acc <= 100) return { level: 'Fair', color: 'yellow' };
    return { level: 'Poor', color: 'red' };
  };

  const accuracyInfo = getAccuracyLevel(accuracy);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-white/90 backdrop-blur-md border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            {/* Header */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Smart Location</h3>
                <p className="text-xs text-gray-600">GPS & Network Based</p>
              </div>
            </div>

            {/* Location Status */}
            {location && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Location Found</span>
                </div>
                
                {location.address && (
                  <p className="text-sm text-gray-700 bg-white/80 rounded p-2">
                    📍 {location.address}
                  </p>
                )}
                
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                  <span>Lat: {location.lat.toFixed(6)}</span>
                  <span>Lng: {location.lng.toFixed(6)}</span>
                </div>
                
                {accuracy && (
                  <Badge 
                    variant="outline" 
                    className={`text-${accuracyInfo.color}-700 border-${accuracyInfo.color}-300 bg-${accuracyInfo.color}-50`}
                  >
                    <Crosshair className="w-3 h-3 mr-1" />
                    {accuracyInfo.level} (±{Math.round(accuracy)}m)
                  </Badge>
                )}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-800">Location Error</span>
                </div>
                <p className="text-sm text-red-700 mt-2">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                onClick={getCurrentLocation}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Finding...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Location
                  </>
                )}
              </Button>
              
              <Button
                onClick={startWatchingLocation}
                variant={watchId ? "destructive" : "outline"}
                className="flex-1"
              >
                {watchId ? (
                  <>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Stop Tracking
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 mr-2" />
                    Live Track
                  </>
                )}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
              <div className="text-center">
                <Globe className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                <span className="text-xs text-gray-600">GPS + Network</span>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 mx-auto text-green-500 mb-1" />
                <span className="text-xs text-gray-600">Privacy Safe</span>
              </div>
              <div className="text-center">
                <Crosshair className="w-5 h-5 mx-auto text-purple-500 mb-1" />
                <span className="text-xs text-gray-600">High Accuracy</span>
              </div>
            </div>

            {/* Privacy Notice */}
            <p className="text-xs text-gray-500 bg-gray-50 rounded p-2">
              🔒 Your location data is processed securely and never stored permanently
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GPSLocationTracker;
