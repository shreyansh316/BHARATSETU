
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Scale, 
  FileText, 
  Users, 
  Clock, 
  Phone,
  Star,
  Bot,
  BookOpen,
  Shield,
  Gavel,
  ArrowLeft,
  Search,
  Download,
  MessageCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIContextualHelp from '@/components/AIContextualHelp';
import AIChat from '@/components/AIChat';
import { useAdvancedAI } from '@/hooks/useAdvancedAI';

const KanoonSathi = () => {
  const navigate = useNavigate();
  const { activateAI, isAIActive } = useAdvancedAI();
  const [showAIHelp, setShowAIHelp] = useState(false);

  useEffect(() => {
    activateAI('legal');
  }, [activateAI]);

  const legalStats = [
    { label: 'Cases Resolved', value: '8,450', change: '+15%', icon: Gavel },
    { label: 'Documents Generated', value: '12,300', change: '+22%', icon: FileText },
    { label: 'Legal Consultations', value: '3,200', change: '+18%', icon: Users },
    { label: 'Active Lawyers', value: '1,245', change: '+8%', icon: Scale }
  ];

  const documentTemplates = [
    {
      id: 1,
      type: 'FIR',
      title: 'First Information Report',
      description: 'File an FIR for criminal complaints with AI assistance',
      usage: 2450,
      category: 'Criminal Law'
    },
    {
      id: 2,
      type: 'Consumer Complaint',
      title: 'Consumer Protection Act Complaint',
      description: 'Lodge complaints against deficient services or defective products',
      usage: 1890,
      category: 'Consumer Law'
    },
    {
      id: 3,
      type: 'Rent Agreement',
      title: 'Rental Agreement',
      description: 'Create legally binding rental agreements',
      usage: 3200,
      category: 'Property Law'
    },
    {
      id: 4,
      type: 'Legal Notice',
      title: 'Legal Notice Template',
      description: 'Send formal legal notices for various purposes',
      usage: 1560,
      category: 'Civil Law'
    }
  ];

  const lawyers = [
    {
      id: 1,
      name: 'Adv. Priya Sharma',
      specialization: ['Criminal Law', 'Family Law'],
      experience: 8,
      rating: 4.7,
      consultationFee: 2000,
      languages: ['Hindi', 'English'],
      availability: 'Available Today',
      cases: 450
    },
    {
      id: 2,
      name: 'Adv. Rajesh Kumar',
      specialization: ['Civil Law', 'Property Law'],
      experience: 12,
      rating: 4.5,
      consultationFee: 2500,
      languages: ['Hindi', 'English', 'Bengali'],
      availability: 'Available Tomorrow',
      cases: 620
    },
    {
      id: 3,
      name: 'Adv. Meera Patel',
      specialization: ['Corporate Law', 'Tax Law'],
      experience: 10,
      rating: 4.8,
      consultationFee: 3000,
      languages: ['Hindi', 'English', 'Gujarati'],
      availability: 'Available Now',
      cases: 380
    }
  ];

  const legalServices = [
    {
      id: 1,
      title: 'AI Legal Assistant',
      description: 'Get instant legal advice powered by advanced AI',
      icon: Bot,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Document Generator',
      description: 'Create legal documents with AI-powered templates',
      icon: FileText,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      title: 'Case Tracking',
      description: 'Track your legal cases across all courts',
      icon: Search,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 4,
      title: 'Legal Consultation',
      description: 'Connect with verified lawyers for expert advice',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">KanoonSathi</h1>
                  <p className="text-sm text-gray-600">AI-Powered Legal Assistance Platform</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowAIHelp(true)}
                className="border-blue-200 hover:bg-blue-50"
              >
                <Bot className="w-4 h-4 mr-2" />
                Legal AI
              </Button>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {isAIActive ? 'AI Active' : 'AI Ready'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {legalStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="documents">Legal Documents</TabsTrigger>
            <TabsTrigger value="lawyers">Find Lawyers</TabsTrigger>
            <TabsTrigger value="services">Legal Services</TabsTrigger>
            <TabsTrigger value="learn-more">Learn More</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>AI-Powered Document Templates</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {documentTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
                            <Badge variant="outline" className="mt-1">{template.category}</Badge>
                          </div>
                          <Badge variant="secondary">{template.usage} uses</Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{template.description}</p>
                        
                        <div className="flex space-x-2">
                          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600">
                            <Bot className="w-4 h-4 mr-2" />
                            Generate with AI
                          </Button>
                          <Button variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Legal Document Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe your legal requirement
                    </label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="e.g., I need a rental agreement for a 2BHK apartment in Delhi..."
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                    <Bot className="w-4 h-4 mr-2" />
                    Generate Document with AI
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lawyers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Verified Legal Professionals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {lawyers.map((lawyer) => (
                    <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{lawyer.name}</h3>
                            <p className="text-gray-600">{lawyer.experience} years experience</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium">{lawyer.rating}</span>
                            </div>
                            <Badge 
                              variant={lawyer.availability === 'Available Now' ? 'default' : 'secondary'}
                              className={lawyer.availability === 'Available Now' ? 'bg-green-100 text-green-800' : ''}
                            >
                              {lawyer.availability}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-600">Consultation Fee</p>
                            <p className="font-semibold">₹{lawyer.consultationFee}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Cases Handled</p>
                            <p className="font-semibold">{lawyer.cases}+</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-xs text-gray-600">Languages</p>
                            <p className="font-semibold">{lawyer.languages.join(', ')}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {lawyer.specialization.map((spec, index) => (
                            <Badge key={index} variant="outline">{spec}</Badge>
                          ))}
                        </div>

                        <div className="flex space-x-2">
                          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Book Consultation
                          </Button>
                          <Button variant="outline">
                            <Phone className="w-4 h-4 mr-2" />
                            Call Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {legalServices.map((service) => (
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

            <Card>
              <CardHeader>
                <CardTitle>Case Tracking System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Case Number
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., CRL.A. 123/2024"
                      />
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                        <Search className="w-4 h-4 mr-2" />
                        Track Case
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learn-more" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About KanoonSathi</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold mb-3">Democratizing Legal Access</h3>
                    <p className="text-gray-700">
                      KanoonSathi is India's first AI-powered legal assistance platform designed to make justice accessible to every citizen. By combining cutting-edge artificial intelligence with deep legal expertise, we're transforming how Indians interact with the legal system.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Revolutionary Features</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li><strong>AI Legal Assistant:</strong> Natural language processing understands legal queries and provides instant guidance.</li>
                      <li><strong>Smart Document Generation:</strong> AI creates legally sound documents tailored to specific requirements.</li>
                      <li><strong>Lawyer Network:</strong> Verified network of 1,000+ lawyers across all specializations and regions.</li>
                      <li><strong>Case Management:</strong> Real-time tracking of cases across all Indian courts.</li>
                      <li><strong>Legal Research Engine:</strong> AI-powered search through vast legal databases and case laws.</li>
                      <li><strong>Multilingual Support:</strong> Available in 15+ Indian languages for universal accessibility.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">How AI Transforms Legal Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Document Intelligence</h4>
                        <p className="text-sm text-gray-600">AI analyzes legal documents for completeness, accuracy, and compliance with current laws.</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Legal Research Automation</h4>
                        <p className="text-sm text-gray-600">Machine learning algorithms search through millions of case laws to find relevant precedents.</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Risk Assessment</h4>
                        <p className="text-sm text-gray-600">Predictive analytics assess case strength and likely outcomes based on historical data.</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Cost Optimization</h4>
                        <p className="text-sm text-gray-600">AI suggests the most cost-effective legal strategies and fee structures.</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Legal Areas Covered</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        'Criminal Law', 'Civil Law', 'Family Law', 'Property Law',
                        'Corporate Law', 'Tax Law', 'Labor Law', 'Consumer Law',
                        'Constitutional Law', 'Environmental Law', 'Cyber Law', 'Banking Law'
                      ].map((area, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg text-center">
                          <p className="text-sm font-medium">{area}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Success Stories</h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                        <p className="text-gray-700 mb-4">
                          "KanoonSathi's AI helped me draft a comprehensive rental agreement in minutes. The platform's legal consultation feature connected me with an expert lawyer who reviewed my case for a fraction of traditional costs."
                        </p>
                        <p className="text-sm font-semibold">- Sneha Gupta, Small Business Owner, Mumbai</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
                        <p className="text-gray-700 mb-4">
                          "As a first-time homebuyer, I was overwhelmed by legal documentation. KanoonSathi's AI assistant guided me through each step, and I successfully completed my property purchase without any legal issues."
                        </p>
                        <p className="text-sm font-semibold">- Rohit Sharma, Software Engineer, Bangalore</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Integration with Indian Legal System</h3>
                    <p className="text-gray-700">
                      KanoonSathi is fully integrated with India's digital court system, including e-Courts, e-Filing portals, and the National Judicial Data Grid. Our platform ensures compliance with all procedural requirements and maintains real-time synchronization with court databases.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Future Vision</h3>
                    <p className="text-gray-700">
                      We envision a future where every Indian citizen has immediate access to legal guidance and representation. Our roadmap includes blockchain-based contract management, AR-powered court navigation, and AI mediators for dispute resolution.
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
        currentPage="legal"
        isVisible={showAIHelp}
        onClose={() => setShowAIHelp(false)}
      />
      <AIChat />
    </div>
  );
};

export default KanoonSathi;
