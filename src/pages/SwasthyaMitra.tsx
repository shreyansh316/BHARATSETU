
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Activity, 
  Users, 
  MapPin, 
  Phone,
  Star,
  Bot,
  BookOpen,
  Shield,
  Stethoscope,
  ArrowLeft,
  Calendar,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIContextualHelp from '@/components/AIContextualHelp';
import AIChat from '@/components/AIChat';
import { useAdvancedAI } from '@/hooks/useAdvancedAI';

const SwasthyaMitra = () => {
  const navigate = useNavigate();
  const { activateAI, isAIActive } = useAdvancedAI();
  const [showAIHelp, setShowAIHelp] = useState(false);
  const [symptoms, setSymptoms] = useState('');

  useEffect(() => {
    activateAI('health');
  }, [activateAI]);

  const healthStats = [
    { label: 'Consultations Today', value: '2,450', change: '+12%', icon: Stethoscope },
    { label: 'Active Hospitals', value: '1,245', change: '+8%', icon: Heart },
    { label: 'Health Records', value: '45,200', change: '+15%', icon: FileText },
    { label: 'Emergency Cases', value: '23', change: '-5%', icon: AlertCircle }
  ];

  const nearbyHospitals = [
    {
      id: 1,
      name: 'AIIMS Delhi',
      address: 'Ansari Nagar, New Delhi',
      distance: '2.5 km',
      rating: 4.8,
      specialties: ['Cardiology', 'Neurology', 'Oncology'],
      phone: '+91-11-26588500',
      ayushmanAccepted: true,
      emergencyAvailable: true
    },
    {
      id: 2,
      name: 'Safdarjung Hospital',
      address: 'Safdarjung, New Delhi',
      distance: '3.2 km',
      rating: 4.3,
      specialties: ['General Medicine', 'Surgery', 'Pediatrics'],
      phone: '+91-11-26165060',
      ayushmanAccepted: true,
      emergencyAvailable: true
    },
    {
      id: 3,
      name: 'Apollo Hospital',
      address: 'Sarita Vihar, Delhi',
      distance: '5.1 km',
      rating: 4.6,
      specialties: ['Cardiology', 'Orthopedics', 'Neurology'],
      phone: '+91-11-26925858',
      ayushmanAccepted: false,
      emergencyAvailable: true
    }
  ];

  const healthServices = [
    {
      id: 1,
      title: 'AI Health Assessment',
      description: 'Get instant health insights using advanced AI analysis',
      icon: Bot,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Telemedicine',
      description: 'Consult with certified doctors online',
      icon: Stethoscope,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      title: 'Health Records',
      description: 'Secure digital health record management',
      icon: FileText,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 4,
      title: 'Emergency Services',
      description: '24/7 emergency medical assistance',
      icon: AlertCircle,
      color: 'from-red-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
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
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">SwasthyaMitra</h1>
                  <p className="text-sm text-gray-600">AI-Powered Healthcare Assistant</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowAIHelp(true)}
                className="border-green-200 hover:bg-green-50"
              >
                <Bot className="w-4 h-4 mr-2" />
                Health AI
              </Button>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {isAIActive ? 'AI Active' : 'AI Ready'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {healthStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-green-500" />
                </div>
                <p className={`text-xs mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from yesterday
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="assessment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="assessment">Health Assessment</TabsTrigger>
            <TabsTrigger value="hospitals">Find Hospitals</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="learn-more">Learn More</TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span>AI Health Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe your symptoms
                    </label>
                    <textarea
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={4}
                      placeholder="e.g., fever, headache, fatigue..."
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600">
                    <Activity className="w-4 h-4 mr-2" />
                    Analyze Symptoms
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Health Check</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Heart className="w-4 h-4 mr-2" />
                      Heart Rate Monitor
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="w-4 h-4 mr-2" />
                      Blood Pressure Check
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      BMI Calculator
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Health Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-800">Daily Hydration</p>
                      <p className="text-xs text-green-600">Drink at least 8 glasses of water daily</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">Regular Exercise</p>
                      <p className="text-xs text-blue-600">30 minutes of physical activity daily</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">Mental Health</p>
                      <p className="text-xs text-purple-600">Practice meditation for better well-being</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hospitals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Nearby Hospitals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nearbyHospitals.map((hospital) => (
                    <div key={hospital.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
                          <p className="text-gray-600 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {hospital.address} • {hospital.distance}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {hospital.emergencyAvailable && (
                            <Badge variant="destructive">24/7 Emergency</Badge>
                          )}
                          {hospital.ayushmanAccepted && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Ayushman Bharat
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">{hospital.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{hospital.phone}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {hospital.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline">{specialty}</Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Appointment
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {healthServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Button className="w-full">Access Service</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="learn-more" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About SwasthyaMitra</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold mb-3">Revolutionary Healthcare Platform</h3>
                    <p className="text-gray-700">
                      SwasthyaMitra represents a paradigm shift in healthcare delivery, combining the power of artificial intelligence with India's robust healthcare infrastructure. Our platform serves as your personal health companion, providing 24/7 access to medical insights, hospital networks, and emergency services.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Core Capabilities</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li><strong>AI-Powered Diagnosis:</strong> Advanced machine learning algorithms analyze symptoms and provide preliminary health assessments.</li>
                      <li><strong>Hospital Network Integration:</strong> Real-time connectivity with over 1,000+ hospitals across India.</li>
                      <li><strong>Telemedicine Platform:</strong> Connect with certified doctors for remote consultations.</li>
                      <li><strong>Emergency Response System:</strong> Instant access to emergency services with location-based routing.</li>
                      <li><strong>Health Record Management:</strong> Secure, blockchain-based digital health records.</li>
                      <li><strong>Ayushman Bharat Integration:</strong> Seamless integration with government health schemes.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">How AI Enhances Healthcare</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Predictive Analytics</h4>
                        <p className="text-sm text-gray-600">AI algorithms predict potential health risks based on lifestyle patterns and medical history.</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Symptom Analysis</h4>
                        <p className="text-sm text-gray-600">Natural language processing interprets symptoms and suggests appropriate medical care.</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Treatment Optimization</h4>
                        <p className="text-sm text-gray-600">Machine learning optimizes treatment plans based on patient response and medical literature.</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Drug Interaction Checking</h4>
                        <p className="text-sm text-gray-600">Real-time analysis of medication interactions and contraindications.</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Privacy & Security</h3>
                    <p className="text-gray-700">
                      SwasthyaMitra adheres to the highest standards of data protection, implementing end-to-end encryption and compliance with India's Digital Personal Data Protection Act. Your health information is stored securely and never shared without explicit consent.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Impact Stories</h3>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        "SwasthyaMitra's AI assessment detected early signs of diabetes during a routine check. The timely intervention helped me manage my condition effectively. The platform's integration with my local hospital made follow-up care seamless."
                      </p>
                      <p className="text-sm font-semibold">- Rajesh Kumar, Teacher, Patna</p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Future Innovations</h3>
                    <p className="text-gray-700">
                      We're continuously evolving with features like IoT health device integration, AR-based medical consultations, and AI-powered mental health support. Our roadmap includes expansion to rural healthcare delivery through drone-based medical supply chains and satellite connectivity.
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Components */}
      <AIContextualHelp 
        currentPage="health"
        isVisible={showAIHelp}
        onClose={() => setShowAIHelp(false)}
      />
      <AIChat />
    </div>
  );
};

export default SwasthyaMitra;
