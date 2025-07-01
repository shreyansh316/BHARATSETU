
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sprout, 
  CloudRain, 
  TrendingUp, 
  MapPin, 
  Calendar,
  DollarSign,
  ArrowLeft,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  AlertTriangle,
  Camera,
  Bot,
  Newspaper,
  BarChart3,
  Leaf
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KrishiBandhu = () => {
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    humidity: 65,
    rainfall: 12,
    windSpeed: 8
  });
  const [marketPrices, setMarketPrices] = useState([
    { crop: 'Wheat', price: 2100, change: '+5.2%', trend: 'up' },
    { crop: 'Rice', price: 1850, change: '-2.1%', trend: 'down' },
    { crop: 'Cotton', price: 5200, change: '+8.7%', trend: 'up' },
    { crop: 'Sugarcane', price: 350, change: '+1.5%', trend: 'up' }
  ]);

  const crops = [
    { id: 'wheat', name: 'Wheat', icon: '🌾', season: 'Rabi', growth: 85 },
    { id: 'rice', name: 'Rice', icon: '🌾', season: 'Kharif', growth: 92 },
    { id: 'cotton', name: 'Cotton', icon: '🌿', season: 'Kharif', growth: 78 },
    { id: 'sugarcane', name: 'Sugarcane', icon: '🎋', season: 'Year-round', growth: 95 }
  ];

  const features = [
    { icon: Bot, title: 'AI Crop Advisor', desc: 'Get AI-powered farming recommendations' },
    { icon: CloudRain, title: 'Weather Forecasting', desc: '15-day accurate weather predictions' },
    { icon: TrendingUp, title: 'Market Analysis', desc: 'Real-time commodity prices and trends' },
    { icon: Newspaper, title: 'Agricultural News', desc: 'Latest farming news and government schemes' },
    { icon: Camera, title: 'Crop Health Scanner', desc: 'AI-powered disease detection using camera' },
    { icon: BarChart3, title: 'Yield Prediction', desc: 'Predict your crop yield with AI analytics' }
  ];

  const newsItems = [
    {
      title: 'New Kisan Credit Card Scheme Launched',
      source: 'Agriculture Ministry',
      time: '2 hours ago',
      category: 'Government'
    },
    {
      title: 'Monsoon Expected to be Normal This Year',
      source: 'IMD Weather',
      time: '4 hours ago',
      category: 'Weather'
    },
    {
      title: 'Export Prices for Wheat Increase by 12%',
      source: 'Market Today',
      time: '6 hours ago',
      category: 'Market'
    }
  ];

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() - 0.5) * 10))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Sprout className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    KrishiBandhu
                  </h1>
                  <p className="text-sm text-gray-600">Advanced Farming AI Assistant</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Bot className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Weather Widget */}
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Today's Weather</h3>
                <Sun className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Thermometer className="w-4 h-4 mr-2" />
                  <span>{Math.round(weatherData.temperature)}°C</span>
                </div>
                <div className="flex items-center">
                  <Droplets className="w-4 h-4 mr-2" />
                  <span>{Math.round(weatherData.humidity)}% Humidity</span>
                </div>
                <div className="flex items-center">
                  <Wind className="w-4 h-4 mr-2" />
                  <span>{weatherData.windSpeed} km/h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Trends */}
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Market Trends</h3>
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">₹2,100</div>
                <div className="text-sm opacity-90">Wheat (per quintal)</div>
                <div className="flex items-center text-sm">
                  <span className="text-green-200">↗ +5.2% this week</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crop Health */}
          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Crop Health</h3>
                <Leaf className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">Good</div>
                <div className="text-sm opacity-90">Overall Status</div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Yield Prediction */}
          <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Yield Prediction</h3>
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">42 Q/Ha</div>
                <div className="text-sm opacity-90">Expected Yield</div>
                <div className="text-sm text-purple-200">+12% vs last season</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="crops" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="crops">My Crops</TabsTrigger>
            <TabsTrigger value="market">Market Prices</TabsTrigger>
            <TabsTrigger value="news">Agricultural News</TabsTrigger>
            <TabsTrigger value="ai-advisor">AI Advisor</TabsTrigger>
          </TabsList>

          <TabsContent value="crops">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Crop Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Select Crop</h3>
                {crops.map((crop) => (
                  <Card
                    key={crop.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedCrop === crop.id 
                        ? 'ring-2 ring-green-500 bg-green-50' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedCrop(crop.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{crop.icon}</span>
                          <div>
                            <h4 className="font-medium text-gray-900">{crop.name}</h4>
                            <p className="text-sm text-gray-600">{crop.season} Season</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">{crop.growth}%</div>
                          <div className="text-xs text-gray-500">Growth</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Crop Details */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-2xl">🌾</span>
                      <span>Wheat Crop Management</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Growth Timeline */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Growth Timeline</h4>
                        <div className="space-y-4">
                          {[
                            { stage: 'Seeding', status: 'completed', date: 'Nov 15' },
                            { stage: 'Germination', status: 'completed', date: 'Nov 25' },
                            { stage: 'Tillering', status: 'current', date: 'Dec 20' },
                            { stage: 'Heading', status: 'upcoming', date: 'Feb 15' },
                            { stage: 'Harvest', status: 'upcoming', date: 'Apr 10' }
                          ].map((stage, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${
                                stage.status === 'completed' ? 'bg-green-500' :
                                stage.status === 'current' ? 'bg-blue-500 animate-pulse' :
                                'bg-gray-300'
                              }`}></div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-gray-900">{stage.stage}</span>
                                  <span className="text-sm text-gray-600">{stage.date}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AI Recommendations */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">AI Recommendations</h4>
                        <div className="space-y-3">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-start space-x-2">
                              <Bot className="w-5 h-5 text-blue-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-blue-800">Irrigation Alert</p>
                                <p className="text-xs text-blue-600">Apply irrigation in 2-3 days based on soil moisture</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="flex items-start space-x-2">
                              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-yellow-800">Pest Watch</p>
                                <p className="text-xs text-yellow-600">Monitor for aphids in next 5 days</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="flex items-start space-x-2">
                              <Leaf className="w-5 h-5 text-green-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-green-800">Fertilizer Tip</p>
                                <p className="text-xs text-green-600">Apply urea @ 50kg/ha for better tillering</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="market">
            <Card>
              <CardHeader>
                <CardTitle>Live Market Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketPrices.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">{item.crop[0]}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.crop}</h4>
                          <p className="text-sm text-gray-600">Per Quintal</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">₹{item.price}</div>
                        <div className={`text-sm ${
                          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news">
            <Card>
              <CardHeader>
                <CardTitle>Latest Agricultural News</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsItems.map((news, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{news.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{news.source}</span>
                            <span>•</span>
                            <span>{news.time}</span>
                            <Badge variant="outline" className="text-xs">
                              {news.category}
                            </Badge>
                          </div>
                        </div>
                        <Newspaper className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-advisor">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-6 h-6 text-blue-600" />
                  <span>AI Farming Advisor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900 mb-2">Ask Krishi AI</h3>
                      <p className="text-blue-700 mb-4">
                        Get personalized farming advice powered by advanced AI. Ask about crop management, 
                        disease prevention, market trends, or government schemes.
                      </p>
                      <div className="flex space-x-2">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Camera className="w-4 h-4 mr-2" />
                          Scan Crop Issue
                        </Button>
                        <Button variant="outline">
                          Ask Question
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    'Weather forecast for my area',
                    'Best fertilizer for wheat',
                    'Crop disease identification',
                    'Market price prediction',
                    'Government subsidy schemes',
                    'Soil health assessment'
                  ].map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="p-4 h-auto text-left justify-start"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KrishiBandhu;
