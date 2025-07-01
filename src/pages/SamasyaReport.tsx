
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Camera, 
  MapPin, 
  Clock, 
  CheckCircle,
  Star,
  Bot,
  BookOpen,
  Shield,
  Zap,
  ArrowLeft,
  Upload,
  Eye,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIContextualHelp from '@/components/AIContextualHelp';
import AIChat from '@/components/AIChat';
import { useAdvancedAI } from '@/hooks/useAdvancedAI';

const SamasyaReport = () => {
  const navigate = useNavigate();
  const { activateAI, isAIActive } = useAdvancedAI();
  const [showAIHelp, setShowAIHelp] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    activateAI('report');
  }, [activateAI]);

  const reportStats = [
    { label: 'Issues Reported', value: '15,450', change: '+12%', icon: AlertTriangle },
    { label: 'Issues Resolved', value: '12,300', change: '+18%', icon: CheckCircle },
    { label: 'Active Reports', value: '3,150', change: '+5%', icon: Clock },
    { label: 'Response Rate', value: '89%', change: '+3%', icon: TrendingUp }
  ];

  const issueCategories = [
    { id: 'roads', name: 'Roads & Transportation', icon: '🚧', count: 2450, priority: 'high' },
    { id: 'water', name: 'Water Supply', icon: '💧', count: 1890, priority: 'high' },
    { id: 'electricity', name: 'Power & Electricity', icon: '⚡', count: 1560, priority: 'medium' },
    { id: 'waste', name: 'Waste Management', icon: '🗑️', count: 2100, priority: 'medium' },
    { id: 'safety', name: 'Public Safety', icon: '🚨', count: 890, priority: 'high' },
    { id: 'other', name: 'Other Issues', icon: '📋', count: 1200, priority: 'low' }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Large Pothole on Main Road',
      category: 'roads',
      location: 'Sector 15, Gurgaon',
      status: 'in_progress',
      priority: 'high',
      reportedDate: '2024-01-10',
      upvotes: 45,
      photos: 3
    },
    {
      id: 2,
      title: 'Broken Street Light',
      category: 'electricity',
      location: 'Park Street, Kolkata',
      status: 'acknowledged',
      priority: 'medium',
      reportedDate: '2024-01-09',
      upvotes: 23,
      photos: 2
    },
    {
      id: 3,
      title: 'Water Leakage in Public Area',
      category: 'water',
      location: 'MG Road, Bangalore',
      status: 'resolved',
      priority: 'high',
      reportedDate: '2024-01-08',
      upvotes: 67,
      photos: 4
    }
  ];

  const civicServices = [
    {
      id: 1,
      title: 'AI Issue Detection',
      description: 'Automatic identification and categorization of civic issues',
      icon: Bot,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Photo Documentation',
      description: 'Capture and upload evidence with GPS tagging',
      icon: Camera,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      title: 'Real-time Tracking',
      description: 'Track issue resolution progress in real-time',
      icon: Eye,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 4,
      title: 'Community Voting',
      description: 'Democratic prioritization through community engagement',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
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
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">SamasyaReport</h1>
                  <p className="text-sm text-gray-600">AI-Powered Civic Issue Reporting</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowAIHelp(true)}
                className="border-orange-200 hover:bg-orange-50"
              >
                <Bot className="w-4 h-4 mr-2" />
                Report AI
              </Button>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {isAIActive ? 'AI Active' : 'AI Ready'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {reportStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">{stat.change} from last week</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="report" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="report">Report Issue</TabsTrigger>
            <TabsTrigger value="track">Track Issues</TabsTrigger>
            <TabsTrigger value="services">Civic Services</TabsTrigger>
            <TabsTrigger value="learn-more">Learn More</TabsTrigger>
          </TabsList>

          <TabsContent value="report" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bot className="w-5 h-5" />
                    <span>AI-Powered Issue Reporting</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Category
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {issueCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`p-3 border rounded-lg text-left hover:shadow-md transition-shadow ${
                              selectedCategory === category.id ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{category.icon}</span>
                              <div>
                                <p className="text-sm font-medium">{category.name}</p>
                                <p className="text-xs text-gray-600">{category.count} reports</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Describe the Issue
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        rows={4}
                        placeholder="Describe the civic issue in detail..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter location or use GPS"
                        />
                        <Button variant="outline">
                          <MapPin className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Photos
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload photos or drag and drop</p>
                        <Button variant="outline" className="mt-2">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600">
                      <Zap className="w-4 h-4 mr-2" />
                      Submit Report with AI Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Community Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReports.map((report) => (
                      <div key={report.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{report.title}</h3>
                          <div className="flex space-x-1">
                            <Badge variant="secondary" className={getStatusColor(report.status)}>
                              {report.status.replace('_', ' ')}
                            </Badge>
                            <Badge variant="secondary" className={getPriorityColor(report.priority)}>
                              {report.priority}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {report.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {report.reportedDate}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3 text-sm">
                            <span className="flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                              {report.upvotes} upvotes
                            </span>
                            <span className="flex items-center">
                              <Camera className="w-3 h-3 mr-1 text-blue-500" />
                              {report.photos} photos
                            </span>
                          </div>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="track" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Track Your Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Report ID
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="e.g., RPT-2024-001234"
                      />
                      <Button className="bg-gradient-to-r from-orange-500 to-red-600">
                        <Eye className="w-4 h-4 mr-2" />
                        Track Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Issue Categories Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {issueCategories.map((category) => (
                    <div key={category.id} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <h3 className="font-semibold mb-1">{category.name}</h3>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{category.count}</p>
                      <Badge variant="secondary" className={getPriorityColor(category.priority)}>
                        {category.priority} priority
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {civicServices.map((service) => (
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
                <CardTitle>About SamasyaReport</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="space-y-6">
                  <section>
                    <h3 className="text-lg font-semibold mb-3">Empowering Citizens Through Technology</h3>
                    <p className="text-gray-700">
                      SamasyaReport is India's most advanced civic issue reporting platform, leveraging artificial intelligence to create transparent, efficient, and accountable governance. Our platform transforms how citizens interact with municipal authorities and drives systematic improvements in urban infrastructure.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Advanced AI Capabilities</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li><strong>Intelligent Issue Classification:</strong> AI automatically categorizes and prioritizes reports based on severity and impact.</li>
                      <li><strong>Duplicate Detection:</strong> Advanced algorithms prevent duplicate reporting and consolidate similar issues.</li>
                      <li><strong>Predictive Analytics:</strong> Machine learning predicts infrastructure failures before they occur.</li>
                      <li><strong>Resource Optimization:</strong> AI suggests optimal resource allocation for maximum impact.</li>
                      <li><strong>Sentiment Analysis:</strong> Natural language processing analyzes community sentiment and urgency.</li>
                      <li><strong>Image Recognition:</strong> Computer vision automatically identifies issue types from uploaded photos.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">How the Platform Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold mb-2">1. Report</h4>
                        <p className="text-sm text-gray-600">Capture and submit civic issues with photos, location, and detailed descriptions.</p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-semibold mb-2">2. AI Analysis</h4>
                        <p className="text-sm text-gray-600">Advanced algorithms analyze, categorize, and prioritize your report automatically.</p>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold mb-2">3. Authority Routing</h4>
                        <p className="text-sm text-gray-600">Reports are automatically routed to the appropriate municipal department.</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold mb-2">4. Resolution Tracking</h4>
                        <p className="text-sm text-gray-600">Real-time updates on issue resolution progress with community feedback.</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Types of Issues We Handle</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        'Road Potholes', 'Street Lighting', 'Water Supply', 'Drainage Issues',
                        'Waste Management', 'Traffic Problems', 'Public Safety', 'Noise Pollution',
                        'Air Quality', 'Park Maintenance', 'Building Violations', 'Utility Failures'
                      ].map((issue, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg text-center">
                          <p className="text-sm font-medium">{issue}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Community Impact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg text-center">
                        <h4 className="text-2xl font-bold text-blue-600">15,450+</h4>
                        <p className="text-sm">Issues Reported</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg text-center">
                        <h4 className="text-2xl font-bold text-green-600">12,300+</h4>
                        <p className="text-sm">Issues Resolved</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg text-center">
                        <h4 className="text-2xl font-bold text-purple-600">89%</h4>
                        <p className="text-sm">Resolution Rate</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Success Stories</h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
                        <p className="text-gray-700 mb-4">
                          "I reported a dangerous pothole through SamasyaReport, and within 48 hours, the municipal corporation had it fixed. The AI system's priority classification ensured immediate attention to this safety hazard."
                        </p>
                        <p className="text-sm font-semibold">- Amit Patel, Citizen Reporter, Ahmedabad</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                        <p className="text-gray-700 mb-4">
                          "Our neighborhood had persistent water supply issues. Through coordinated reporting on SamasyaReport, we were able to demonstrate the scale of the problem. The authorities upgraded our entire water infrastructure."
                        </p>
                        <p className="text-sm font-semibold">- Dr. Meera Sharma, Community Leader, Pune</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Municipal Integration</h3>
                    <p className="text-gray-700">
                      SamasyaReport is integrated with over 500 municipal corporations across India, enabling seamless communication between citizens and authorities. Our platform connects with existing municipal management systems, ensuring no report goes unnoticed.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Transparency & Accountability</h3>
                    <p className="text-gray-700">
                      Every report on our platform is publicly visible (with privacy controls), creating a transparent ecosystem where citizens can track municipal performance. Our AI-powered analytics provide insights into resolution patterns, helping identify systemic issues and best practices.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold mb-3">Future Roadmap</h3>
                    <p className="text-gray-700">
                      We're developing advanced features including IoT sensor integration for automatic issue detection, drone-based verification systems, and blockchain-based transparent voting mechanisms for community prioritization of civic improvements.
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
        currentPage="report"
        isVisible={showAIHelp}
        onClose={() => setShowAIHelp(false)}
      />
      <AIChat />
    </div>
  );
};

export default SamasyaReport;
