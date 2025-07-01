import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Camera, 
  Navigation, 
  Volume2, 
  ArrowLeft,
  Eye,
  Ear,
  Accessibility,
  Heart,
  Brain,
  Phone,
  Shield,
  Bot,
  Compass,
  Route,
  AlertTriangle,
  CheckCircle,
  Star,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AbleAccessMap = () => {
  const navigate = useNavigate();
  const [cameraPermission, setCameraPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [isARActive, setIsARActive] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const accessibilityFeatures = [
    { 
      icon: Accessibility, 
      title: 'Wheelchair Access', 
      desc: 'Find wheelchair-accessible routes and facilities',
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      icon: Eye, 
      title: 'Visual Assistance', 
      desc: 'Audio navigation and obstacle detection for visually impaired',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      icon: Ear, 
      title: 'Hearing Support', 
      desc: 'Visual alerts and sign language interpretation',
      color: 'from-purple-500 to-indigo-600'
    },
    { 
      icon: Brain, 
      title: 'Cognitive Aid', 
      desc: 'Simplified navigation and memory assistance',
      color: 'from-orange-500 to-red-600'
    },
    { 
      icon: Heart, 
      title: 'Health Monitoring', 
      desc: 'Track vital signs and emergency contacts',
      color: 'from-pink-500 to-rose-600'
    },
    { 
      icon: Bot, 
      title: 'AI Assistant', 
      desc: 'Intelligent support for daily activities',
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const nearbyLocations = [
    { name: 'City Hospital', type: 'Medical', distance: '0.5 km', accessibility: 95, rating: 4.8 },
    { name: 'Metro Station', type: 'Transport', distance: '0.3 km', accessibility: 90, rating: 4.6 },
    { name: 'Shopping Mall', type: 'Commercial', distance: '1.2 km', accessibility: 88, rating: 4.7 },
    { name: 'Public Library', type: 'Education', distance: '0.8 km', accessibility: 92, rating: 4.9 },
    { name: 'Community Center', type: 'Social', distance: '0.7 km', accessibility: 85, rating: 4.5 }
  ];

  useEffect(() => {
    // Request camera permission on component mount
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraPermission('granted');
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera permission denied:', error);
      setCameraPermission('denied');
    }
  };

  const startARNavigation = () => {
    if (cameraPermission === 'granted') {
      setIsARActive(true);
      // Initialize AR navigation logic here
      console.log('AR Navigation started');
    } else {
      requestCameraPermission();
    }
  };

  const stopARNavigation = () => {
    setIsARActive(false);
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    AbleAccess Map
                  </h1>
                  <p className="text-sm text-gray-600">AR Navigation for Accessibility</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Camera className="w-3 h-3 mr-1" />
                AR Enabled
              </Badge>
              {cameraPermission === 'granted' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Camera Ready
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AR Camera View */}
        {isARActive && (
          <Card className="mb-8 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-6 h-6" />
                  <span>AR Navigation Active</span>
                </CardTitle>
                <Button
                  onClick={stopARNavigation}
                  variant="outline"
                  className="text-white border-white hover:bg-white/20"
                >
                  Stop AR
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-96 object-cover"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
              />
              {/* AR Overlay Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <Compass className="w-5 h-5 animate-spin" />
                    <span>Scanning for accessibility features...</span>
                  </div>
                </div>
              </div>
              {/* Direction Indicators */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <Badge className="bg-green-500">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Wheelchair Accessible
                </Badge>
                <Badge className="bg-blue-500">
                  <Route className="w-3 h-3 mr-1" />
                  50m to destination
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white cursor-pointer hover:scale-105 transition-transform">
            <CardContent className="p-6" onClick={startARNavigation}>
              <div className="flex items-center space-x-4">
                <Camera className="w-12 h-12" />
                <div>
                  <h3 className="text-xl font-bold">Start AR Navigation</h3>
                  <p className="text-blue-100">Use your camera for real-time guidance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-pointer hover:scale-105 transition-transform">
            <CardContent className="p-6" onClick={() => speakText('Voice guidance activated. How can I help you navigate?')}>
              <div className="flex items-center space-x-4">
                <Volume2 className="w-12 h-12" />
                <div>
                  <h3 className="text-xl font-bold">Voice Guidance</h3>
                  <p className="text-green-100">Audio navigation assistance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white cursor-pointer hover:scale-105 transition-transform">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Shield className="w-12 h-12" />
                <div>
                  <h3 className="text-xl font-bold">Emergency SOS</h3>
                  <p className="text-purple-100">Quick access to emergency services</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Camera Permission Request */}
        {cameraPermission === 'denied' && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <AlertTriangle className="w-12 h-12 text-orange-500" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-orange-800">Camera Access Required</h3>
                  <p className="text-orange-700 mb-4">
                    To use AR navigation features, please allow camera access. This enables real-time 
                    obstacle detection and navigation assistance.
                  </p>
                  <Button
                    onClick={requestCameraPermission}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Enable Camera
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="navigation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="features">Accessibility</TabsTrigger>
            <TabsTrigger value="nearby">Nearby Places</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="navigation">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Route Planning */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Route className="w-6 h-6 text-blue-600" />
                    <span>Smart Route Planning</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                      <input
                        type="text"
                        placeholder="Current location"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                      <input
                        type="text"
                        placeholder="Enter destination"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mobility Aid</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option>Wheelchair</option>
                          <option>Walking Stick</option>
                          <option>Guide Dog</option>
                          <option>None</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Travel Mode</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                          <option>Walking</option>
                          <option>Public Transport</option>
                          <option>Private Vehicle</option>
                        </select>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600">
                      <Navigation className="w-4 h-4 mr-2" />
                      Plan Accessible Route
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Live Navigation Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Compass className="w-6 h-6 text-green-600" />
                    <span>Navigation Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <div>
                          <h4 className="font-semibold text-green-800">Route Optimized</h4>
                          <p className="text-sm text-green-700">Wheelchair accessible path found</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Distance</span>
                        <span className="text-blue-600">850 meters</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Estimated Time</span>
                        <span className="text-blue-600">12 minutes</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Accessibility Score</span>
                        <span className="text-green-600">95%</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
                      onClick={() => speakText('Starting navigation. Turn right in 50 meters towards the wheelchair accessible entrance.')}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Start Voice Navigation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="features">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessibilityFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{feature.desc}</p>
                        <Button size="sm" variant="outline">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="nearby">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility-Rated Nearby Places</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{location.name}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{location.type}</span>
                            <span>•</span>
                            <span>{location.distance}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">{location.rating}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${location.accessibility}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-green-600">{location.accessibility}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-6 h-6 text-purple-600" />
                    <span>Community Reviews</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { user: 'Priya S.', rating: 5, comment: 'Excellent wheelchair access at City Mall. Very helpful staff!', time: '2 hours ago' },
                      { user: 'Rahul M.', rating: 4, comment: 'Metro station has good facilities but needs better signage.', time: '1 day ago' },
                      { user: 'Anita K.', rating: 5, comment: 'Hospital entrance is perfectly accessible. Great experience!', time: '3 days ago' }
                    ].map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{review.user}</span>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.time}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Report Accessibility Issue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        placeholder="Enter location or address"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>Blocked wheelchair access</option>
                        <option>Missing ramp</option>
                        <option>Broken elevator</option>
                        <option>Poor lighting</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        placeholder="Describe the accessibility issue..."
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600">
                      <Camera className="w-4 h-4 mr-2" />
                      Add Photo & Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AbleAccessMap;
